import * as React from "react";

import { Box, Flex } from "reflexbox";

import * as style from "styles/components/Account.scss";

interface IAccountProps {
    id: number;
    name: string;
    balance: number;
}

export default class Account extends React.Component<IAccountProps, {}> {
    render() {
        if (this.props.id) {
            return (
                <Flex className={style.account} px={2} align="center" auto>
                    <Box auto>{this.props.name}</Box>
                    <Box>Balance: {this.props.balance} kr</Box>
                </Flex>
            );
        } else {
            return (
                <Flex className={style.account} px={2} align="center" auto>
                    <Box>Paying with cash</Box>
                </Flex>
            );
        }
    }
}
