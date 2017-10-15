import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { style } from "typestyle";
import { white, black, greyDark } from "common/styling";
import { Product } from "components/SecondaryScreen/Product";
import { Icon } from "components/Icon";
import { purchaseStore } from "store/PurchaseStore";
import { accountStore } from "store/AccountStore";
import { cartStore } from "store/CartStore";

const classNames = {
    container: style({
        width: "100%"
    }),
    products: style({
        display: "flex",
        flexWrap: "wrap"
    }),
    bar: style({
        color: white,
        display: "block",
        fontSize: 22,
        textAlign: "left",
        height: 60,
        transition: "bottom .3s ease",
        background: black,
        zIndex: 9
    }),
    active: style({
        opacity: 1
    }),
    balance: style({
        borderRight: "2px solid",
        borderColor: greyDark,
        marginRight: 16
    }),
    notCompleted: style({
        animation: "rotating 2s linear infinite"
    })
};

@observer
export class Cart extends React.Component {
    renderProducts() {
        if (cartStore.products.size === 0) {
            return <div>Your cart is empty.</div>;
        }

        const content = cartStore.products.values().map((product) => {
            return (
                <CSSTransition classNames="product" timeout={300}>
                    <Product product={product} key={product.code}/>
                </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={classNames.products}>
                {content}
            </TransitionGroup>
        );
    }

    render() {
        const account = accountStore.account;
        const accountIcon = account && account.name ? "user-circle-o" : "money";

        return (
            <div className={classNames.container}>
                <div className={classNames.bar}>
                        <Icon name="shopping-cart" />
                        <div>Your shopping cart</div>
                </div>
                {this.renderProducts()}
                <div className={classNames.bar}>
                    <Icon name={accountIcon}/>
                    <div>{account ? account.name : "Cash payment"}</div>
                    <div>Total: <strong>{purchaseStore.total} kr</strong></div>
                </div>
            </div>
        );
    }
}
