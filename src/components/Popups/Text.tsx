import * as React from "react";
import { observer } from "mobx-react";
import { style, classes } from "typestyle";
import { white, red, green, black } from "common/styling";

const classNames = {
    container: style({
        background: white,
        color: black,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }),
    inner: style({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }),
    icon: style({
        fontSize: 50,
        marginRight: 8
    }),
    title: style({
        fontSize: 32,
        fontWeight: "bold"
    }),
    msg: style({
        fontSize: 24
    }),
    alert: style({
        background: red,
        color: white
    }),
    success: style({
        background: green,
        color: white
    })
};

export enum TextPopupType {
    INFO,
    ALERT,
    SUCCESS
}

interface ITextPopupProps {
    title: string;
    msg?: string;
    type?: TextPopupType;
}

@observer
export class TextPopup extends React.Component<ITextPopupProps> {
    getTypeStyle(type: TextPopupType) {
        switch (type) {
            case TextPopupType.ALERT:
                return {
                    icon: "exclamation",
                    className: classNames.alert
                };
            case TextPopupType.SUCCESS:
                return {
                    icon: "check",
                    className: classNames.success
                };
            case TextPopupType.INFO:
                return {
                    icon: "info",
                    className: undefined
                };
        }
    }

    render() {
        const { title, msg, type = TextPopupType.INFO } = this.props;
        const typeStyle = this.getTypeStyle(type);

        return (
            <div className={classes(classNames.container, typeStyle.className)}>
                <div className={classNames.inner}>
                    <div className={classes("fa-stack fa-lg", classNames.icon)}>
                        <i className="fa fa-circle-thin fa-stack-2x"></i>
                        <i className={`fa fa-${typeStyle.icon} fa-stack-1x`}></i>
                    </div>
                    <div>
                        <div className={classNames.title}>{title}</div>
                        {msg && <div className={classNames.msg}>{msg}</div>}
                    </div>
                </div>
            </div>
        );
    }
}
