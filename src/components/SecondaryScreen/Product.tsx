import * as React from "react";
import * as classNames from "classnames";
import { IProduct } from "types";

import { Box, Flex } from "reflexbox";
import { LoadingBox } from "components";

import * as style from "styles/secondary/components/Product.scss";

export default class Product extends React.Component<IProduct> {
    render() {
        if (this.props.loading) {
            return (
                <Box className={style.product}>
                    <LoadingBox className={style.loading}/>
                </Box>
            );
        } else if (this.props.failed) {
            return (
                <Flex className={classNames(style.product, style.failed)}>
                    Unknown item
                </Flex>
            );
        } else {
            return (
                <Flex className={style.product}>
                    <Box className={style.image} style={{backgroundImage: `url(${this.props.image})`}} />
                    <Box className={style.name}>{this.props.name}</Box>
                    <Box className={style.quantity}>{this.props.qty} x</Box>
                    <Box className={style.price}>{this.props.price} kr</Box>
                </Flex>
            );
        }
    }
}
