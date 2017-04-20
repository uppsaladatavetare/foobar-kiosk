import * as React from "react";
import * as classNames from "classnames";

import Icon from "components/Icon";
import { Box, Flex } from "reflexbox";

import * as style from "styles/primary/components/Button.scss";

interface IButtonProps {
    onClick: Function;
    icon?: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    success?: boolean;
    alert?: boolean;
}

export default class Button extends React.Component<IButtonProps, {}> {
    render() {
        let className = classNames(style.button, this.props.className, {
            [style.disabled]: this.props.disabled,
            [style.alert]: this.props.alert,
            [style.active]: this.props.success
        });

        return (
            <Flex
                p={2}
                align="center"
                justify="center"
                onClick={this.props.onClick}
                className={className}>
                {(this.props.label ? <Box auto>{this.props.label}</Box> : undefined)}
                {(this.props.icon ? <Box><Icon name={this.props.icon}/></Box> : undefined)}
            </Flex>
        );
    }
}
