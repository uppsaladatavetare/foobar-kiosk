import { apiCall } from "api";
import { IAccount } from "types";

import { newPurchase } from "actions/purchase";

export const REQUEST_ACCOUNT = "REQUEST_ACCOUNT";
export const FAILED_ACCOUNT = "FAILED_ACCOUNT";
export const LOGIN_ACCOUNT = "LOGIN_ACCOUNT";
export const CLEAR_ACCOUNT = "CLEAR_ACCOUNT";

export function requestAccount(cardId: string) {
    return {
        type: REQUEST_ACCOUNT,
        cardId
    };
};

export function receiveAccount(data: IAccount = undefined) {
    return {
        type: LOGIN_ACCOUNT,
        data
    };
};

export function failedRequestAccount() {
    return {
        type: FAILED_ACCOUNT
    };
};

export function login(cardId: string = undefined) {
    return (dispatch: Function, getState: any) => {
        const { account } = getState();

        if (!account.length) {
            dispatch(requestAccount(cardId));
            if (cardId) {
                return apiCall(`/accounts/${cardId}/`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data: IAccount) => {
                        dispatch(newPurchase());
                        dispatch(receiveAccount(data));
                    })
                    .catch((data: any) => {
                        dispatch(failedRequestAccount());
                        setTimeout(() => {
                            if (getState().account.failed) {
                                dispatch(clearAccount());
                            }
                        }, 5000);
                    });
            } else {
                dispatch(newPurchase());
                dispatch(receiveAccount());
            }
        }
    };
};

export function clearAccount() {
    return {
        type: CLEAR_ACCOUNT
    };
};
