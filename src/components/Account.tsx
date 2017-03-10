import * as React from "react";
import { IAccount } from "types";
import * as classNames from "classnames";
import { Box, Flex } from "reflexbox";
import { Button } from "components";
import * as style from "styles/components/Account.scss";


interface IAccountProps {
    account: IAccount;
    viewProfileQR: Function;
}

export default class Account extends React.Component<IAccountProps, {}> {
    
    render() {
        var classList = classNames({

            [style.account]: true, 
            [style.notCompleted]: !this.props.account.isComplete        
        });
        if (this.props.account.id) {
            return (
                <Flex className={classList} px={2} align="center" auto>
                    <Box auto>{this.props.account.name}</Box>
                    <Button
                        icon="edit"
                        className={style.balance}
                        onClick={this.props.viewProfileQR}/>
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
