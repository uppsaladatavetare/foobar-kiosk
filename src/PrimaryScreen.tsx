import * as React from "react";
import { observer } from "mobx-react";
import { classes, style } from "typestyle";
import { ProductList } from "components/ProductList";
import { PurchaseButton } from "components/PurchaseButton";
import { Account } from "components/Account";
import { Sidebar } from "components/Sidebar";
import { Button } from "components/Button";
import { purchaseStore, PurchaseState } from "store/PurchaseStore";
import { accountStore } from "store/AccountStore";

const classNames = {
    container: style({
        background: "#88a0a8",
        overflow: "hidden",
        display: "flex",
        position: "relative",
        flex: 1,
        minWidth: 800,
        minHeight: 480,
        flexShrink: 0
    }),
    start: style({
        fontSize: 28,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }),
    quit: style({
        position: "absolute",
        top: 0,
        right: 0
    }),
    line: style({
        padding: "8px 0"
    }),
    bottom: style({
        display: "flex"
    }),
    fill: style({
        display: "flex",
        flexDirection: "column",
        flex: 1
    })
};

@observer
export class PrimaryScreen extends React.Component {
    cancelPurchase = () => {
        accountStore.clearAccount();
        purchaseStore.cancelPurchase();
    }

    render() {
        if (purchaseStore.state === PurchaseState.WAITING) {
            return (
                <div className={classes(classNames.container, classNames.start)}>
                    <div className={classNames.line}>Blip a card linked with your account</div>
                    <div className={classNames.line}>or</div>
                    <div className={classNames.line}>Scan a product to start a cash payment</div>
                </div>
            );
        } else {
            return (
                <div className={classNames.container}>
                    <Sidebar/>
                    <div className={classNames.fill}>
                        <ProductList/>
                        <div className={classNames.bottom}>
                            <Account/>
                            <PurchaseButton/>
                        </div>
                    </div>
                    <Button icon="times" alert className={classNames.quit} onClick={this.cancelPurchase}/>
                </div>
            );
        }
    }
}
