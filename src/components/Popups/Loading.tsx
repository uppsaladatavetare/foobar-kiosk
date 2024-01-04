import * as React from "react";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { black } from "common/styling";
import { Loading } from "components/Loading";

const classNames = {
    container: style({
        background: black,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    })
};

@observer
export class LoadingPopup extends React.Component {
    render() {
        return (
            <div className={classNames.container}>
                <Loading/>
            </div>
        );
    }
}
