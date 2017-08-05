import * as React from "react";
import * as classNames from "classnames";

import * as style from "styles/primary/components/LoadingBox.scss";

interface ILoadingBoxProps {
    className?: string;
}

export default class LoadingBox extends React.Component<ILoadingBoxProps> {
    render() {
        const { className = "" } = this.props;

        return (
            <div className={classNames(style.loading, className)}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        );
    }
}
