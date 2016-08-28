import { apiCall } from "api";
import { IProduct } from "types";

import { clearProducts } from "actions/product";
import { clearAccount } from "actions/account";

export const NEW_PURCHASE = "NEW_PURCHASE";
export const PENDING_PURCHASE = "PENDING_PURCHASE";
export const FINALIZE_PURCHASE = "FINALIZE_PURCHASE";
export const END_PURCHASE = "END_PURCHASE";

export function newPurchase() {
    return {
        type: NEW_PURCHASE
    };
};

export function pendingPurchase() {
    return {
        type: PENDING_PURCHASE
    };
};

export function finalizePurchase(data: any) {
    return {
        type: FINALIZE_PURCHASE,
        data
    };
};

export function clearPurchase() {
    return (dispatch: Function) => {
        dispatch(clearProducts());
        dispatch(clearAccount());
        dispatch(endPurchase());
    };
};

export function endPurchase() {
    return {
        type: END_PURCHASE
    };
};

export function requestPurchase() {
    return (dispatch: Function, getState: Function) => {
        dispatch(pendingPurchase());
        const { account, products } = getState();

        return apiCall("/purchases/", {
            method: "post",
            body: JSON.stringify({
                account_id: (account.id ? account.id : null), // tslint:disable-line
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
            .then((response: IResponse) => {
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
};
