import * as React from "react";
import { apiCall } from "common/api";
import { observable, action, computed, reaction } from "mobx";
import { accountStore } from "store/AccountStore";
import { cartStore } from "store/CartStore";
import { viewStore } from "store/ViewStore";
import { TextPopupType, TextPopup } from "components/Popups/Text";
import { LoadingPopup } from "components/Popups/Loading";

const cashSound = new Audio(require("../../static/cash.wav"));
const doorSound = new Audio(require("../../static/door.wav"));

export enum PurchaseState {
    ONGOING,
    PENDING,
    FINALIZED,
    FAILED,
    WAITING
}

class PurchaseStore {
    @observable state: PurchaseState = PurchaseState.WAITING;
    endPurchaseTimeout?: any;

    constructor() {
        reaction(
            () => accountStore.account,
            (account) => {
                if (account && account.isLoaded) {
                    this.startPurchase();
                }
            }
        );

        cartStore.products.observe((change) => {
            if (!accountStore.account && change.type === "add" && change.object.size === 1) {
                this.startPurchase();
            }
        });
    }

    @computed
    get total() {
        return cartStore.products.values().reduce((total, product) => {
            if (product && product.isLoaded) {
                return total + product.qty * product.price;
            } else {
                return total;
            }
        }, 0);
    }

    @action
    requestPurchase() {
        const account = accountStore.account;
        if (account && account.failed) {
            return;
        }

        this.state = PurchaseState.PENDING;

        viewStore.showPopup({
            component: <LoadingPopup/>,
            closeWhen: () => this.state !== PurchaseState.PENDING,
            blockInput: true
        });

        apiCall("/purchases/", {
            method: "post",
            body: JSON.stringify({
                account_id: (account ? account.id : null),
                products: cartStore.products.values().filter((product) => {
                    return product.isLoaded;
                }).map((product) => ({
                    id: product.id,
                    qty: product.qty
                }))
            })
        })
            .then((response: any) => response.json())
            .then(action((data: any) => { // FIXME: Use returned total instead of frontend based calculation
                this.state = PurchaseState.FINALIZED;

                cashSound.play();

                viewStore.showPopup({
                    component: (
                        <TextPopup type={TextPopupType.SUCCESS}
                                   title="Thank you for your purchase"
                                   msg={`The total cost was ${purchaseStore.total} kr`}/>
                    ),
                    closeWhen: () => this.state !== PurchaseState.FINALIZED,
                    onClose: () => this.endPurchase()
                });

                this.endPurchaseTimeout = setTimeout(() => {
                   this.endPurchase();
                }, 5000);
            }))
            .catch(action((data: any) => {
                console.error("Failed to finalize purchase", data);
                this.state = PurchaseState.FAILED;

                viewStore.showPopup({
                    component: <TextPopup type={TextPopupType.ALERT} title="Failed to finalize purchase"/>,
                    closeWhen: () => this.state !== PurchaseState.FAILED,
                    blockInput: true
                });

                this.endPurchaseTimeout = setTimeout(() => {
                   this.endPurchase();
                }, 5000);
            }));
    }

    @action
    clearPurchase() {
        console.log("apa");
        this.state = PurchaseState.WAITING;
        cartStore.clearProducts();
    }

    endPurchase() {
        if (this.endPurchaseTimeout) {
            clearTimeout(this.endPurchaseTimeout);
        }
        this.clearPurchase();
    }

    cancelPurchase() {
        doorSound.play();
        this.clearPurchase();
    }

    @action
    startPurchase() {
        this.state = PurchaseState.ONGOING;
    }
}

export const purchaseStore = new PurchaseStore();
