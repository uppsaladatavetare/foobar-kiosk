import { apiCall } from "api";

import { login } from "actions/account";

const objectAssign = require("object-assign");

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
            return null;
        } else {
            return (new Date()) >= this.cache[key].expires;
        }
    }

    add(key: string, value: any, ttl: number) {
        let expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + ttl);

        this.cache[key] = {
            data: value,
            expires: expirationDate
        };
    }

    get(key: string, allowExpired = false) {
        if (!allowExpired && this.hasKey(key))
            return this.cache[key].data;
        if (allowExpired && key in this.cache)
            return this.cache[key].data;
        return null;
    }
}

class ProductFetcher {
    cache = new Cache();
    promises = {};

    productWithEAN(dispatch: any, ean: string) {
        if (this.cache.hasKey(ean)) {
            let product = this.cache.get(ean);
            dispatch(requestProduct(ean));
            dispatch(receiveProduct(product));
            return;
        }
        if (ean in this.promises) {
            // fetching of the product in progress
            return this.promises[ean];
        }
        if (this.cache.hasKey(ean, true)) {
            // the product record has expired, but use it anyway
            // and refresh it in background
            dispatch(requestProduct(ean));
            dispatch(receiveProduct(this.cache.get(ean, true)));

            this.promises[ean] = apiCall(`/products/?code=${ean}`)
                .then((response: any) => {
                    return response.json();
                })
                .then((data: any) => {
                    if (data.length) {
                        this.cache.add(ean, data[0], 5 * 60);
                    }
                    delete this.promises[ean];
                });

            return this.promises[ean];
        }

        // product record not found in the cache, fetch it and dispatch
        // appropriate actions
        dispatch(requestProduct(ean));
        this.promises[ean] = apiCall(`/products/?code=${ean}`)
            .then((response: any) => {
                return response.json();
            })
            .then((data: any) => {
                if (data.length) {
                    this.cache.add(ean, data[0], 5 * 60);
                    dispatch(receiveProduct(data[0]));
                } else {
                    dispatch(failedProduct(ean));
                    setTimeout(() => {
                        dispatch(removeProduct(ean));
                    }, 2000);
                }
                delete this.promises[ean];
            });

        return this.promises[ean];
    }
}

let fetcher = new ProductFetcher();

export function addProduct(ean: string) {
    return (dispatch: Function, getState: any) => {
        const { purchase } = getState();
        if (purchase.state === "WAITING" || purchase.state === "ONGOING") {
            dispatch(login(null));
            return fetcher.productWithEAN(dispatch, ean);
        }
    };
};

export function requestProduct(ean: string) {
    return {
        type: REQUEST_PRODUCT,
        ean: ean
    };
};
export function failedProduct(ean: string) {
    return {
        type: FAILED_PRODUCT,
        ean: ean
    };
};

export function receiveProduct(data: any) {
    return objectAssign({
        type: ADD_PRODUCT,
    }, data);
};

export function increaseProductQty(count: number) {
    return {
        type: INCREASE_PRODUCT_QTY,
        count: count
    };
};

export function selectProduct(ean: string) {
    return {
        type: SELECT_PRODUCT,
        ean: ean
    };
};

export function removeProduct(ean?: string) {
    return {
        type: REMOVE_PRODUCT,
        ean: ean
    };
};

export function changePage(count: number) {
    return {
        type: CHANGE_PAGE,
        count: count
    };
};

export function clearProducts() {
    return {
        type: CLEAR_PRODUCTS
    };
};
