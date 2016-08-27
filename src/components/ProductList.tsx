import * as React from "react";

import Product from "components/Product";

interface Props {
    products: any;
    onSelect: Function;
}

export default class ProductList extends React.Component<Props, {}> {
    render() {
        const {products} = this.props;

        if (products.products.length === 0) {
            return (
                <div id="purchase">
                    <div className="info">Scan an item to make it a part of your purchase.</div>
                </div>
            );
        } else {
            let page = products.page;

            return (
                <div id="purchase" style={{ "transform": `translate(0, calc(${page} * -206px))` }}>
                    {products.products.map((product: any, index: number) => {
                        return <Product {...product} key={index} onSelect={this.props.onSelect}/>;
                    })}
                </div>
            );
        }
    }
}
