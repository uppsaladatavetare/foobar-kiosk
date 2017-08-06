import { apiCall } from "api";
import { IProduct } from "types";

import { clearProducts } from "actions/product";
import { clearAccount } from "actions/account";

export const NEW_PURCHASE = "NEW_PURCHASE";
export const PENDING_PURCHASE = "PENDING_PURCHASE";
export const FINALIZE_PURCHASE = "FINALIZE_PURCHASE";
export const END_PURCHASE = "END_PURCHASE";
export const PROFILE = "PROFILE";

export function newPurchase() {
    return {
        type: NEW_PURCHASE
    };
}

export function pendingPurchase() {
    return {
        type: PENDING_PURCHASE
    };
}

export function finalizePurchase(data: any) {
    const cashSound = new Audio(require('../../static/cash.wav'));
    cashSound.play();
    return {
        type: FINALIZE_PURCHASE,
        data
    };
}

export function viewProfileQR() {
    return {
        type: PROFILE
    };
}

export function clearPurchase() {
    return (dispatch: Function) => {
        dispatch(clearProducts());
        dispatch(clearAccount());
        dispatch(endPurchase());
    };
}

export function endPurchase() {
    return {
        type: END_PURCHASE
    };
}

export function cancelPurchase() {
    const doorSound = new Audio(require('../../static/door.wav'));
    doorSound.play();
    return clearPurchase();
}

export function requestPurchase() {
    return (dispatch: Function, getState: Function) => {
        dispatch(pendingPurchase());
        const { account, products } = getState();

        return apiCall("/purchases/", {
            method: "post",
            body: JSON.stringify({
                account_id: (account.id ? account.id : null),
                products: products.products.filter((product: IProduct) => {
                    return !product.loading && !product.failed;
                }).map((product: IProduct) => {
                    return {
                        id: product.id,
                        qty: product.qty
                    };
                })
            })
        })
            .then((response: any) => {
                return response.json();
            })
            .then((data: any) => {
                dispatch(clearProducts());
                dispatch(clearAccount());
                dispatch(finalizePurchase(data));
                setTimeout(() => {
                    if (getState().purchase.state === "FINALIZED") {
                        dispatch(endPurchase());
                    }
                }, 5000);
            });
    };
}
