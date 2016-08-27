import { apiCall } from "api";

import { newPurchase } from "actions/purchase";

export const REQUEST_ACCOUNT = "REQUEST_ACCOUNT";
export const LOGIN_ACCOUNT = "LOGIN_ACCOUNT";
export const CLEAR_ACCOUNT = "CLEAR_ACCOUNT";

export function requestAccount(cardId: string) {
    return {
        type: REQUEST_ACCOUNT,
        cardId: cardId
    };
};

export function receiveAccount(data: any) {
    return {
        type: LOGIN_ACCOUNT,
        data: data
    };
};

export function login(cardId: string) {
    return (dispatch: any, getState: any) => {
        const { account, purchase } = getState();
        if (!account.length && purchase.state === "WAITING") {
            dispatch(requestAccount(cardId));
            if (cardId) {
                return apiCall(`/accounts/${cardId}/`)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(newPurchase());
                        dispatch(receiveAccount(data));
                    });
            } else {
                dispatch(newPurchase());
                dispatch(receiveAccount(null));
            };
        };
    };
};

export function clearAccount() {
    return {
        type: CLEAR_ACCOUNT
    };
};
