import * as React from "react";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { Button } from "components/Button";
import { purchaseStore, PurchaseState } from "store/PurchaseStore";
import { accountStore } from "store/AccountStore";

const classNames = {
    button: style({
        width: 248,
        textAlign: "left",
        zIndex: 9
    })
};

@observer
export class PurchaseButton extends React.Component {
    requestPurchase = () => {
        purchaseStore.requestPurchase();
    }

    render() {
        const balance = accountStore.account ? accountStore.account.balance : 0;
        const total = purchaseStore.total;

        let active = false;
        let alert = false;
        if (purchaseStore.state === PurchaseState.ONGOING) {
            if (total > 0 && (total <= balance || !balance)) {
                active = true;
            } else if (total > 0 && total > balance) {
                alert = true;
            }
        }

        return (
            <Button label={total + " kr"}
                    icon="shopping-cart"
                    className={classNames.button}
                    disabled={!active}
                    success={active}
                    alert={alert}
                    onClick={this.requestPurchase}/>
        );
    }
}
