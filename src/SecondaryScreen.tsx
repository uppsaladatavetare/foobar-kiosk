import * as React from "react";
import { Cart } from "components/SecondaryScreen/Cart";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { white, greyDark } from "common/styling";

import * as udLogo from "../static/ud.svg";

const classNames = {
    container: style({
        background: white,
        overflow: "hidden",
        display: "block",
        flex: 1
    }),
    start: style({
        fontSize: 28
    }),
    banner: style({
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 8
    }),
    receiptContainer: style({
        background: greyDark,
        width: 671
    })
};

@observer
export class SecondaryScreen extends React.Component {
    render() {
        return (
            <div className={classNames.container}>
                <div className={classNames.receiptContainer}>
                    <Cart/>
                </div>
                <div className={classNames.banner}>
                    <img src={udLogo} alt=""/>
                </div>
            </div>
        );
    }
}
