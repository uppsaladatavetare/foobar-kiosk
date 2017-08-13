import * as React from "react";
import { observer } from "mobx-react";
import { classes, style } from "typestyle";
import { Loading } from "components/Loading";
import { Product as ProductType } from "types/Product";

const classNames = {
    product: style({

    }),
    loading: style({

    }),
    failed: style({

    }),
    image: style({

    }),
    name: style({

    }),
    quantity: style({

    }),
    price: style({

    })
};

interface IProductProps {
    product: ProductType;
}

@observer
export class Product extends React.Component<IProductProps> {
    render() {
        const product = this.props.product;

        if (product.isLoading) {
            return (
                <div className={classNames.product}>
                    <Loading className={classNames.loading}/>
                </div>
            );
        } else if (product.failed) {
            return (
                <div className={classes(classNames.product, classNames.failed)}>
                    Unknown item
                </div>
            );
        }

        return (
            <div className={classNames.product}>
                <div className={classNames.image} style={{backgroundImage: `url(${product.image})`}} />
                <div className={classNames.name}>{product.name}</div>
                <div className={classNames.quantity}>{product.qty} x</div>
                <div className={classNames.price}>{product.price} kr</div>
            </div>
        );
    }
}
