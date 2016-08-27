import * as React from "react";

interface Props {
    loading: boolean;
}

export default class LoadingBox extends React.Component<Props, {}> {
    render() {
        if (this.props.loading) {
            return (
                <div id="loading" className="loading">
                    <div className="rekt1"/>
                    <div className="rekt2"/>
                    <div className="rekt3"/>
                    <div className="rekt4"/>
                    <div className="rekt5"/>
                </div>
            );
        } else {
            return null;
        };
    };
};
