import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { reaction, when } from "mobx";
import { style } from "typestyle";
import { white } from "common/styling";
import { viewStore } from "store/ViewStore";
import { Button } from "components/Button";

const classNames = {
    container: style({
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    }),
    overlay: style({
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.5)",
        pointerEvents: "all"
    }),
    popup: style({
        width: 600,
        height: 360,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        background: white,
        position: "relative",
        pointerEvents: "all"
    }),
    quit: style({
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 9
    }),
    overlayEnter: style({
        opacity: 0
    }),
    overlayEnterActive: style({
        opacity: 1,
        transition: "opacity .3s ease"
    }),
    overlayExit: style({
        opacity: 1
    }),
    overlayExitActive: style({
        opacity: 0,
        transition: "opacity .3s ease"
    }),
    popupEnter: style({
        opacity: 0,
        transform: "translateY(50px)"
    }),
    popupEnterActive: style({
        opacity: 1,
        transform: "translateY(0px)",
        transition: "transform .3s ease, opacity .3s ease"
    }),
    popupExit: style({
        opacity: 1,
        transform: "translateY(0px)"
    }),
    popupExitActive: style({
        opacity: 0,
        transform: "translateY(50px)",
        transition: "transform .3s ease, opacity .3s ease"
    })
};

const overlayTransition = {
    enter: classNames.overlayEnter,
    enterActive: classNames.overlayEnterActive,
    exit: classNames.overlayExit,
    exitActive: classNames.overlayExitActive
};

const popupTransition = {
    enter: classNames.popupEnter,
    enterActive: classNames.popupEnterActive,
    exit: classNames.popupExit,
    exitActive: classNames.popupExitActive
};

@observer
export class PopupContainer extends React.Component {
    componentDidMount() {
        reaction(
            () => viewStore.popups.length > 0 && viewStore.popups[0],
            (popup) => {
                if (popup) {
                    if (popup.autoCloseDelay) {
                        setTimeout(() => {
                            viewStore.closePopup(popup);
                        }, popup.autoCloseDelay);
                    }
                    if (popup.closeWhen) {
                        when(popup.closeWhen, () => {
                            viewStore.closePopup(popup);
                        });
                    }
                }
            }
        );
    }

    closePopup = () => {
        if (viewStore.popups.length > 0 && !viewStore.popups[0].blockInput) {
            viewStore.closePopup(viewStore.popups[0]);
        }
    }

    render() {
        const popup = viewStore.popups.length > 0 ? viewStore.popups[0] : undefined;
        const content = popup && [
            <CSSTransition key="overlay" classNames={overlayTransition} timeout={300}>
                <div className={classNames.overlay} onClick={this.closePopup}/>
            </CSSTransition>,
            <CSSTransition key="popup" classNames={popupTransition} timeout={300}>
                <div className={classNames.popup}>
                    {!popup.blockInput && (
                         <Button icon="times" alert className={classNames.quit} onClick={this.closePopup}/>
                    )}
                    {popup.component}
                </div>
            </CSSTransition>
        ];

        return (
            <TransitionGroup className={classNames.container} appear>
                {content}
            </TransitionGroup>
        );
    }
}
