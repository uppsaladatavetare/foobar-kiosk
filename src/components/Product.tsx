import * as React from "react";
import * as classNames from "classnames";

import { selectProduct } from "actions/product";

interface Props {
    name: string;
    dispatch: any;
    loading: boolean;
    failed: boolean;
    onSelect: Function;
    price: number;
    qty: number;
    image: string;
    ean: string;
    selected: any;
}

export default class Product extends React.Component<Props, {}> {
    render() {
        const {
            dispatch,
            loading,
            failed,
            onSelect

        } = this.props;
        if (this.props.loading) {
            return (
                <div className={classNames("loading", "product")}>
                    <div className="rekt1"/>
                    <div className="rekt2"/>
                    <div className="rekt3"/>
                    <div className="rekt4"/>
                    <div className="rekt5"/>
                </div>
            );
        } else if (this.props.failed) {
            return (
                <div className={classNames("message", "product")}>
                    <div>Unknown item</div>
                </div>
            );
        } else {
            return (
                <div
                    className={classNames({ "selected": this.props.selected }, "product")}
                    onClick={() => this.props.onSelect(this.props.ean)}>
                    <div className={classNames("cell", "image")}>
                        <img src={this.props.image} alt=""/>
                    </div>
                    <div className={classNames("cell", "name")}>{this.props.name}</div>
                    <div className={classNames("cell", "quantity")}>{this.props.qty} x</div>
                    <div className={classNames("cell", "price")}>{this.props.price} kr</div>
                    <div className={classNames("cell", "overlay")}/>
                </div>
            );
        }
    }
}
