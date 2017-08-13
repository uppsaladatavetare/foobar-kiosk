import * as React from "react";
import { observer } from "mobx-react";
import { style, classes } from "typestyle";
import { green, greyDark, white, black, greenDark, red, redDark } from "common/styling";
import { Icon } from "components/Icon";

const classNames = {
    button: style({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: white,
        height: 60,
        fontSize: 28,
        padding: "0 16px",
        minWidth: 60,
        background: black,
        transition: "background 0.3s ease",
        fontWeight: 600,
        $nest: {
            "&:hover": {
                background: greyDark
            },
            "&&:active": {
                background: greyDark
            }
        }
    }),
    disabled: style({
        color: greyDark,
        cursor: "default",
        $nest: {
            "&:hover": {
                background: black
            },
            "&&:active": {
                background: black
            }
        }
    }),
    success: style({
        background: green,
        $nest: {
            "&:hover": {
                background: greenDark
            },
            "&&:active": {
                background: greenDark
            }
        }
    }),
    alert: style({
        background: red,
        color: white,
        $nest: {
            "&:hover": {
                background: redDark
            },
            "&&:active": {
                background: redDark
            }
        }
    }),
    label: style({
        flex: 1
    })
};

interface IButtonProps {
    onClick?: () => void;
    icon?: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    success?: boolean;
    alert?: boolean;
}

@observer
export class Button extends React.Component<IButtonProps> {
    onClick = () => {
        const { disabled, onClick } = this.props;

        if (!disabled && onClick) {
            onClick();
        }
    }

    render() {
        const { disabled, alert, success, className, label, icon, children } = this.props;
        const containerClasses = classes(classNames.button, className,
            disabled && classNames.disabled,
            alert && classNames.alert,
            success && classNames.success
        );

        return (
            <div className={containerClasses} onClick={this.onClick}>
                {!!label && <div className={classNames.label}>{label}</div>}
                {!!icon && <Icon name={icon}/>}
                {children}
            </div>
        );
    }
}
