import * as React from "react";
import * as classNames from "classnames";

interface IIconProps {
    name: string;
    className?: string;
}

export default class Icon extends React.Component<IIconProps, {}> {
    render() {
        return <i className={classNames("fa", "fa-" + this.props.name, this.props.className)}></i>;
    }
}
