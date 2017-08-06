import { apiCall } from "api";
import { IProduct } from "types";

import { login } from "actions/account";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const INCREASE_PRODUCT_QTY = "INCREASE_PRODUCT_QTY";
export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REQUEST_PRODUCT = "REQUEST_PRODUCT";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const PENDING_PURCHASE = "PENDING_PURCHASE";
export const FINALIZE_PURCHASE = "FINALIZE_PURCHASE";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
export const FAILED_PRODUCT = "FAILED_PRODUCT";

class Cache {
    cache = {};

    hasKey(key: string, allowExpired: boolean = false) {
        if (allowExpired) {
            return key in this.cache;
        } else {
            return key in this.cache && (new Date()) < this.cache[key].expires;
        }
    }

    hasExpired(key: string) {
        if (!(key in this.cache)) {
            return undefined;
        } else {
            return (new Date()) >= this.cache[key].expires;
        }
    }

    add(key: string, value: any, ttl: number) {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + ttl);

        this.cache[key] = {
            data: value,
            expires: expirationDate
        };
    }

    get(key: string, allowExpired = false) {
        if (!allowExpired && this.hasKey(key)) {
            return this.cache[key].data;
        }
        if (allowExpired && key in this.cache) {
            return this.cache[key].data;
        }
        return undefined;
    }
}

class ProductFetcher {
    cache = new Cache();
    promises = {};

    productWithCode(dispatch: Function, code: string) {
        /*if (this.cache.hasKey(code)) {
            let product = this.cache.get(code);
            dispatch(requestProduct(code));
            dispatch(receiveProduct(product));
            return;
        }
        if (code in this.promises) {
            // fetching of the product in progress
            return this.promises[code];
        }
        if (this.cache.hasKey(code, true)) {
            // the product record has expired, but use it anyway
            // and refresh it in background
            dispatch(requestProduct(code));
            dispatch(receiveProduct(this.cache.get(code, true)));

            this.promises[code] = apiCall(`/products/?code=${code}`)
                .then((response: any) => {
                    return response.json();
                })
                .then((data: any) => {
                    if (data.length) {
                        this.cache.add(code, data[0], 5 * 60);
                    }
                    delete this.promises[code];
                });

            return this.promises[code];
        }*/

        // product record not found in the cache, fetch it and dispatch
        // appropriate actions
        dispatch(requestProduct(code));
        this.promises[code] = apiCall(`/products/?code=${code}`)
            .then((response: any) => {
                return response.json();
            })
            .then((data: IProduct[]) => {
                if (data.length) {
                    this.cache.add(code, data[0], 5 * 60);
                    dispatch(receiveProduct(data[0]));
                } else {
                    dispatch(failedProduct(code));
                    setTimeout(() => dispatch(removeProduct(code)), 2000);
                }
                delete this.promises[code];
            });

        return this.promises[code];
    }
}

const fetcher = new ProductFetcher();

export function addProduct(code: string) {
    return (dispatch: Function, getState: Function) => {
        const { purchase } = getState();

        if (purchase.state === "WAITING" || purchase.state === "ONGOING") {
            if (purchase.state === "WAITING") {
                dispatch(login());
            }
            return fetcher.productWithCode(dispatch, code);
        }
    };
}

export function requestProduct(code: string) {
    return {
        type: REQUEST_PRODUCT,
        code
    };
}

export function failedProduct(code: string) {
    return {
        type: FAILED_PRODUCT,
        code
    };
}

export function receiveProduct(product: IProduct) {
    return {
        type: ADD_PRODUCT,
        product
    };
}

export function increaseProductQty(count: number) {
    return {
        type: INCREASE_PRODUCT_QTY,
        count
    };
}

export function selectProduct(code: string) {
    return {
        type: SELECT_PRODUCT,
        code
    };
}

export function removeProduct(code?: string) {
    return {
        type: REMOVE_PRODUCT,
        code
    };
}

export function changePage(count: number) {
    return {
        type: CHANGE_PAGE,
        count
    };
}

export function clearProducts() {
    return {
        type: CLEAR_PRODUCTS
    };
}
