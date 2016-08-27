import * as React from "react";
import * as classNames from "classnames";

interface Props {
    products: any;
    purchaseState: any;
    accountBalance: any;
    onPurchase: Function;
}

export default class PurchaseButton extends React.Component<Props, {}> {
    render() {
        const {
            products,
            purchaseState,
            accountBalance,
            onPurchase
        } = this.props;

        let total = products.products.filter((product: any) => {
            return !product.loading && !product.failed;
        }).map((product: any) => {
            return product.price * product.qty;
        }).reduce((x: number, y: number) => x + y, 0);

        let buttonClass = "";
        if (purchaseState === "ONGOING") {
            if (total > 0 && (total <= accountBalance || !accountBalance)) {
                buttonClass = "active";
            } else if (total > 0 && total > accountBalance) {
                buttonClass = "alert";
            }
        }

        return (
            <span
                id="buy"
                className={classNames("button", buttonClass)}
                onClick={(buttonClass === "active" ? () => onPurchase() : undefined)}>
                {total} kr <i className="fa fa-shopping-cart"></i>
            </span>
        );
    }
}
