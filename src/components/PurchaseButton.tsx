import * as React from "react";
import { IProductState, IProduct } from "types";

import { Button } from "components";

import * as style from "styles/primary/components/PurchaseButton.scss";

interface IPurchaseButtonProps {
    products: IProductState;
    purchaseState: any;
    accountBalance: any;
    onPurchase: Function;
}

export default class PurchaseButton extends React.Component<IPurchaseButtonProps, {}> {
    render() {
        const { products, purchaseState, accountBalance, onPurchase } = this.props;

        let total = products.products.filter((product: IProduct) => {
            return !product.loading && !product.failed;
        }).map((product: IProduct) => {
            return product.price * product.qty;
        }).reduce((x: number, y: number) => x + y, 0);

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
                onClick={(active ? () => onPurchase() : undefined)}/>
        );
    }
}
