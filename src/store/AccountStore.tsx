import * as React from "react";
import { apiCall } from "common/api";
import { observable, action } from "mobx";
import { Account, IAccount } from "types/Account";
import { viewStore } from "store/ViewStore";
import { TextPopup, TextPopupType } from "components/Popups/Text";
import { LoadingPopup } from "components/Popups/Loading";

class AccountStore {
    @observable account?: Account;
    accountTimeout?: any;

    @action
    login(cardId?: string) {
        if (!this.account && cardId) {
            const account = new Account(cardId);
            this.account = account;

            viewStore.showPopup({
                component: <LoadingPopup/>,
                closeWhen: () => !account.isLoading,
                blockInput: true
            });

            apiCall(`/accounts/${cardId}/`)
                .then((response) => response.json())
                .then((data: IAccount) => {
                    account.populate(data);
                })
                .catch((data: any) => {
                    account.setFailed();

                    viewStore.showPopup({
                        component: (
                            <TextPopup type={TextPopupType.ALERT}
                                       title="This card is not registered"
                                       msg="Ask someone to register it for you"/>
                        ),
                        closeWhen: () => this.account === undefined,
                        onClose: () => this.clearAccount()
                    });

                    this.accountTimeout = setTimeout(() => {
                        this.clearAccount();
                    }, 5000);
                });
        }
    }

    @action
    clearAccount() {
        if (this.accountTimeout) {
            clearTimeout(this.accountTimeout);
        }
        this.account = undefined;
    }
}

export const accountStore = new AccountStore();
