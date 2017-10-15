import * as React from "react";
import { classes } from "typestyle";

interface IIconProps {
    name: string;
    className?: string;
}

export const Icon: React.StatelessComponent<IIconProps> = ({name, className}) => {
    return <i className={classes("fa", "fa-" + name, className)}/>;
};
