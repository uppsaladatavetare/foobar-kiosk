import * as React from "react";
import * as ReactDOM from "react-dom";
import { style } from "typestyle";
import { configureStore } from "store/configureStore";
import { PrimaryScreen } from "./PrimaryScreen";
import { SecondaryScreen } from "./SecondaryScreen";
import { DevToolbar } from "components/DevToolbar";
import { PopupContainer } from "components/PopupContainer";

configureStore();

const classNames = {
    fillScreen: style({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    })
};

ReactDOM.render((
    <div className={classNames.fillScreen}>
        {__DEV__ && <DevToolbar/>}
        {config.SCREEN === "primary" ? <PrimaryScreen/> : <SecondaryScreen/>}
        <PopupContainer/>
    </div>
), document.getElementById("app"));
