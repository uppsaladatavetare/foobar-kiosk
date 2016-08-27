import * as React from "react";
import * as classNames from "classnames";

interface Props {
    onIncrease: Function;
    onDecrease: Function;
    onRemove: Function;
    onScrollUp: Function;
    onScrollDown: Function;
    scrollUpActive: boolean;
    scrollDownActive: boolean;
    active: boolean;
}

export default class ButtonBar extends React.Component<Props, {}> {
    render() {
        const {
            onIncrease,
            onDecrease,
            onRemove,
            onScrollUp,
            onScrollDown,
            scrollUpActive,
            scrollDownActive,
            active
        } = this.props;

        let scrollUpClasses = classNames({
            "button": true,
            "scroll": true,
            "up": true,
            "active": scrollUpActive,
        });

        let scrollDownClasses = classNames({
            "button": true,
            "scroll": true,
            "down": true,
            "active": scrollDownActive,
        });

        return (
            <div id="edit" className={active && "active"}>
                <span className={scrollUpClasses} onClick={() => onScrollUp()}>
                    <i className="fa fa-chevron-up"></i>
                </span>
                <div className="container">
                    <span className="button plus" onClick={() => onIncrease()}>
                        <i className="fa fa-plus"></i>
                    </span>
                    <span className="button minus" onClick={() => onDecrease()}>
                        <i className="fa fa-minus"></i>
                    </span>
                    <span className="button trash" onClick={() => onRemove()}>
                        <i className="fa fa-trash"></i>
                    </span>
                </div>
                <span className={scrollDownClasses} onClick={() => onScrollDown()}>
                    <i className="fa fa-chevron-down"></i>
                </span>
            </div>
        );
    }
}
