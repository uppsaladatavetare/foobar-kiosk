import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { style, classes } from "typestyle";
import { Product } from "components/Product";
import { cartStore } from "store/CartStore";
import { viewStore } from "store/ViewStore";

const classNames = {
    container: style({
        position: "relative",
        flex: 1
    }),
    grid: style({
        display: "flex",
        padding: 4,
        zIndex: 0,
        transition: "transform .3s ease",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flex: 1,
        height: "100%"
    }),
    start: style({
        fontSize: 28,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }),
    enter: style({
        transform: "scale(0)"
    }),
    enterActive: style({
        transform: "scale(1)",
        transition: "transform .3s ease"
    }),
    exit: style({
        transform: "scale(1)"
    }),
    exitActive: style({
        transform: "scale(0)",
        transition: "transform .3s ease"
    })
};

const transition = {
    appear: classNames.enter,
    appearActive: classNames.enterActive,
    enter: classNames.enter,
    enterActive: classNames.enterActive,
    exit: classNames.exit,
    exitActive: classNames.exitActive
};

@observer
export class ProductList extends React.Component {
    onSelect = (code: string) => {
        cartStore.selectProduct(code);
    }

    renderInfo() {
        return (
            <CSSTransition className={classNames.start} classNames={{}} timeout={0}>
                <div>Scan an item to make it a part of your purchase</div>
            </CSSTransition>
        );
    }

    render() {
        const content = cartStore.products.values().map((product) => {
            return (
                <CSSTransition key={product.code} classNames={transition} timeout={300}>
                    <Product product={product} onSelect={this.onSelect}/>
                </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={classes(classNames.container, classNames.grid)} appear
                             style={{ transform: "translate(0, " + viewStore.page * -206 + "px)" }}>
                {cartStore.products.size === 0 && this.renderInfo()}
                {content}
            </TransitionGroup>
        );
    }
}
