import * as React from "react";
import { IAccount } from "types";
import * as classNames from "classnames";
import { Box, Flex } from "reflexbox";
import { Button } from "components";
import * as style from "styles/primary/components/Account.scss";

interface IAccountProps {
    account: IAccount;
    viewProfileQR: Function;
}

export default class Account extends React.Component<IAccountProps> {
    render() {
        const { account, viewProfileQR } = this.props;
        const classList = classNames({
            [style.account]: true,
            [style.notCompleted]: !account.is_complete
        });

        if (account.id) {
            return (
                <Flex className={classList} px={2} align="center" auto>
                    <Box auto>{account.name}</Box>
                    <Button
                        icon="edit"
                        className={style.balance}
                        onClick={viewProfileQR}/>
                    <Box>Balance: {account.balance} kr</Box>
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
