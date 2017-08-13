import * as React from "react";
import { observer } from "mobx-react";
import { style, classes, keyframes } from "typestyle";
import { white, black, greyDark } from "common/styling";
import { accountStore } from "store/AccountStore";
import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { viewStore } from "store/ViewStore";
import { ProfilePopup } from "components/Popups/Profile";

const roatingAnimation = keyframes({
    "10%, 90%": {
        transform: "rotate(-10deg)"
    },
    "20%, 80%": {
        transform: "rotate(10deg)"
    },
    "30%, 50%, 70%": {
        transform: "rotate(-30deg)"
    },
    "40%, 60%": {
        transform: "rotate(30deg)"
    }
});

const classNames = {
    account: style({
        color: white,
        display: "flex",
        fontSize: 22,
        textAlign: "left",
        height: 60,
        transition: "bottom .3s ease",
        background: black,
        zIndex: 9,
        padding: "0 16px",
        lineHeight: "60px",
        alignItems: "center",
        flex: 1
    }),
    notCompleted: style({
        animationName: roatingAnimation,
        animationDuration: "2s",
        animationIterationCount: "infinite"
    }),
    name: style({
        flex: 1
    }),
    button: style({
        borderRight: "2px solid",
        borderColor: greyDark,
        marginRight: 16
    })
};

@observer
export class Account extends React.Component {
    showProfile = () => {
        const account = accountStore.account;

        if (account) {
            viewStore.showPopup({
                component: <ProfilePopup account={account}/>,
                blockInput: true,
                autoCloseDelay: 5000
            });
        }
    }

    render() {
        const account = accountStore.account;
        if (!account || account.failed) {
            return (
                <div className={classNames.account}>
                    Paying with cash
                </div>
            );
        }

        return (
            <div className={classNames.account}>
                <div className={classNames.name}>{account.name}</div>
                <Button onClick={this.showProfile} className={classNames.button}>
                    <Icon name="edit" className={classes(!account.isComplete && classNames.notCompleted)}/>
                </Button>
                <div>Balance: {account.balance} kr</div>
            </div>
        );
    }
}
