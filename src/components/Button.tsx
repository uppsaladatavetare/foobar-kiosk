import * as React from "react";
import * as classNames from "classnames";

import Icon from "components/Icon";
import { Box, Flex } from "reflexbox";

import * as style from "styles/primary/components/Button.scss";

interface IButtonProps {
    onClick?: Function;
    icon?: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    success?: boolean;
    alert?: boolean;
}

export default class Button extends React.Component<IButtonProps> {
    onClick = () => {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const { disabled = false, alert = false, success = false, className = "", label, icon } = this.props;
        const classList = classNames(style.button, className, {
            [style.disabled]: disabled,
            [style.alert]: alert,
            [style.active]: success
        });

        return (
            <Flex p={2} align="center" justify="center" onClick={this.onClick} className={classList}>
                {!!label && <Box auto>{label}</Box>}
                {!!icon && <Icon name={icon}/>}
            </Flex>
        );
    }
}
