import * as React from "react";
import { observer } from "mobx-react";
import { style, classes, types } from "typestyle";
import { white } from "common/styling";
import { Product as ProductType } from "types/Product";
import { Loading } from "components/Loading";

const dock: types.NestedCSSProperties = {
    lineHeight: "18px",
    display: "block",
    position: "absolute"
};

const classNames = {
    container: style({
        height: 198,
        width: 236,
        display: "block",
        position: "relative",
        background: white,
        cursor: "pointer",
        overflow: "hidden",
        margin: 4
    }),
    failed: style({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 24,
        cursor: "default"
    }),
    loading: style({
        height: 198,
        width: 236,
        top: 0,
        left: 0,
        right: 0,
        lineHeight: "198px",
        margin: 0,
        cursor: "default"
    }),
    imageContainer: style(dock, {
        textAlign: "center",
        background: white,
        height: "100%",
        width: "100%",
        lineHeight: "198px"
    }),
    image: style({
        maxHeight: 125,
        maxWidth: 190,
        display: "inline-block",
        verticalAlign: "middle"
    }),
    product: style({
        fontSize: 20,
        fontWeight: 600
    }),
    overlay: style(dock, {
        background: "rgba(152, 219, 89, 0.5)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    }),
    quantity: style(dock, {
        textAlign: "left",
        left: 0,
        bottom: 0,
        padding: 10,
        zIndex: 100
    }),
    price: style(dock, {
        textAlign: "right",
        right: 0,
        bottom: 0,
        padding: 10,
        zIndex: 100
    }),
    name: style(dock, {
        top: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        padding: 10,
        zIndex: 100
    })
};

interface IProductProps {
    product: ProductType;
    onSelect: (code: string) => void;
}

@observer
export class Product extends React.Component<IProductProps> {
    onSelect = () => {
        const { product, onSelect } = this.props;

        onSelect(product.code);
    }

    render() {
        const product = this.props.product;

        if (product.isLoading) {
            return (
                <div className={classNames.container}>
                    <Loading className={classNames.loading} inverted/>
                </div>
            );
        } else if (product.failed) {
            return (
                <div className={classes(classNames.container, classNames.failed)}>
                    Unknown item {product.code}
                </div>
            );
        }

        return (
            <div className={classes(classNames.container, classNames.product)} onClick={this.onSelect}>
                {product.image && (
                     <div className={classNames.imageContainer}>
                         <img src={product.image} alt="" className={classNames.image}/>}
                     </div>
                )}
                <span className={classNames.name}>{product.name}</span>
                <div className={classNames.quantity}>{product.qty} x</div>
                <div className={classNames.price}>{product.price} kr</div>
                {product.selected && <div className={classNames.overlay}/>}
            </div>
        );
    }
}
