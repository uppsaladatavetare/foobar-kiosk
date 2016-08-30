import * as React from "react";
import { IAccount } from "types";

import { Box, Flex } from "reflexbox";

import * as style from "styles/components/Account.scss";

interface IAccountProps {
    account: IAccount;
}

export default class Account extends React.Component<IAccountProps, {}> {
    render() {
        if (this.props.account.id) {
            return (
                <Flex className={style.account} px={2} align="center" auto>
                    <Box auto>{this.props.account.name}</Box>
                    <Box>Balance: {this.props.account.balance} kr</Box>
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
