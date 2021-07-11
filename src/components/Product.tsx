import * as React from "react";
import * as classNames from "classnames";
import { IProduct } from "types";

import { Box, Flex } from "reflexbox";
import { LoadingBox } from "components";

import * as style from "styles/primary/components/Product.scss";

interface IProductProps extends IProduct {
    onSelect: Function;
}

export default class Product extends React.Component<IProductProps> {
    render() {
        if (this.props.loading) {
            return (
                <Box className={style.product}>
                    <LoadingBox className={style.loading}/>
                </Box>
            );
        } else if (this.props.failed) {
            return (
                <Flex
                    align="center"
                    justify="center"
                    className={classNames(style.product, style.failed)}>
                    Unknown item
                </Flex>
            );
        } else {
            return (
                <Box className={style.product} onClick={() => this.props.onSelect(this.props.code)}>
                    <Box className={style.image} style={{backgroundImage: `url(${this.props.image})`}} />
                    <Box className={style.name}>{this.props.name}</Box>
                    <Box className={style.quantity}>{this.props.qty} x</Box>
                    <Box className={style.price}>{this.props.price} kr</Box>
                    {(this.props.selected ? <Box className={style.overlay}/> : undefined)}
                </Box>
            );
        }
    }
}
