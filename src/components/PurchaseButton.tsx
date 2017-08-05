import * as React from "react";
import { IProductState } from "types";

import { Button } from "components";

import * as style from "styles/primary/components/PurchaseButton.scss";

interface IPurchaseButtonProps {
    products: IProductState;
    purchaseState: string;
    accountBalance: number;
    onPurchase: Function;
}

export default class PurchaseButton extends React.Component<IPurchaseButtonProps> {
    render() {
        const { products, purchaseState, accountBalance, onPurchase } = this.props;

        const total = products.products.filter((product) => {
            return !product.loading && !product.failed;
        }).map((product) => {
            return product.price * product.qty;
        }).reduce((x, y) => x + y, 0);

        let active = false;
        let alert = false;
        if (purchaseState === "ONGOING") {
            if (total > 0 && (total <= accountBalance || !accountBalance)) {
                active = true;
            } else if (total > 0 && total > accountBalance) {
                alert = true;
            }
        }

        return (
            <Button
                label={total + " kr"}
                icon="shopping-cart"
                className={style.button}
                disabled={!active}
                success={active}
                alert={alert}
                onClick={onPurchase}/>
        );
    }
}
