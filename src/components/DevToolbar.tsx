import * as React from "react";
import { IAccount } from "types";
import * as classNames from "classnames";
import { Box, Flex } from "reflexbox";
import { Button } from "components";
import * as style from "styles/components/DevToolbar.scss";
import { addProduct, removeProduct, selectProduct, increaseProductQty, changePage } from "actions/product";
import { login, clearAccount } from "actions/account";

interface IDevToolbarProps {
    dispatch: Function
}

export default class DevToolbar extends React.Component<IDevToolbarProps, {}> {
    addRandomProduct() {
        let codes = [
            "7310500088853",
            "7340083438684",
            "7611612221351",
            "7310500114934",
            "7310070765840",
            "7315360010754",
            "7622300342753"
        ];
        let randomIndex = Math.floor(Math.random() * codes.length);
        this.props.dispatch(addProduct(codes[randomIndex]));
    }

    render() {
        var dispatch = this.props.dispatch;
        return (
            <Flex pl={2} align="center" auto className={style.devbar}>
                <Box auto>{process.env.API.host}</Box>
                <Button icon="credit-card" onClick={() => dispatch(login('1337'))}/>
                <Button icon="plus" onClick={() => this.addRandomProduct()}/>
            </Flex>
        );
    }
}
