import * as Redux from "redux";
import { IProduct } from "types";

import {
    ADD_PRODUCT,
    SELECT_PRODUCT,
    INCREASE_PRODUCT_QTY,
    REMOVE_PRODUCT,
    REQUEST_PRODUCT,
    CHANGE_PAGE,
    CLEAR_PRODUCTS,
    FAILED_PRODUCT
} from "actions/product";

const objectAssign = require("object-assign");

export interface IState {
    products: IProduct[];
    page: number;
}

interface IAction extends Redux.Action, IProduct {
    count?: number;
    product?: IProduct;
}

function _products(state: IState, action: IAction) {
    switch (action.type) {
        case REQUEST_PRODUCT:
            let productIndex: number = state.products.map((product: IProduct) => {
                return product.code;
            }).indexOf(action.code);

            if (productIndex === -1) {
                return objectAssign({}, state, {
                    products: [...state.products, {
                        code: action.code,
                        selected: false,
                        loading: true
                    }]
                });
            }

            return state;
        case ADD_PRODUCT:
            let product: IProduct = state.products.filter((product: IProduct) => {
                return product.code === action.product.code;
            })[0];

            if (product.loading) {
                return objectAssign({}, state, {
                    products: state.products.map((product: IProduct) => {
                        if (product.code === action.product.code) {
                            return objectAssign(product, {
                                id: action.product.id,
                                name: action.product.name,
                                selected: false,
                                loading: false,
                                qty: 1,
                                price: action.product.price,
                                image: process.env.API.host + action.product.image
                            });
                        } else {
                            return product;
                        }
                    })
                });
            }

            return objectAssign({}, state, {
                products: state.products.map((product: IProduct) => {
                    if (product.code === action.product.code) {
                        return objectAssign(product, {
                            qty: product.qty + 1
                        });
                    }
                    return product;
                })
            });
        case SELECT_PRODUCT:
            return objectAssign({}, state, {
                products: state.products.map((product: IProduct) => {
                    return objectAssign(product, {
                        selected: (product.code === action.code ? !product.selected : product.selected)
                    });
                })
            });
        case INCREASE_PRODUCT_QTY:
            return objectAssign({}, state, {
                products: state.products.map((product: IProduct) => {
                    return objectAssign(product, {
                        qty: product.qty + (product.selected ? action.count : 0)
                    });
                }).filter((product: IProduct) => {
                    return product.qty > 0;
                })
            });
        case REMOVE_PRODUCT:
            if (action.code) {
                return objectAssign({}, state, {
                    products: state.products.filter((product: IProduct) => {
                        return product.code !== action.code;
                    })
                });
            }

            return objectAssign({}, state, {
                products: state.products.filter((product: IProduct) => {
                    return !product.selected;
                })
            });
        case CLEAR_PRODUCTS:
            return objectAssign({}, state, {
                products: []
            });
        case FAILED_PRODUCT:
            return objectAssign({}, state, {
                products: state.products.map((product: IProduct) => {
                    if (product.code === action.code) {
                        return objectAssign(product, {
                            failed: true,
                            loading: false
                        });
                    } else {
                        return product;
                    }
                })
            });
        default:
            return state;
    }
}

export function products(state: IState = { products: [], page: 0 }, action: IAction) {
    let newState = _products(state, action);
    let newProductAdded = newState.products.length > state.products.length;
    let maxPage = Math.max(0, Math.floor((newState.products.length - 4) / 3));

    newState = objectAssign({}, newState, { maxPage });

    switch (action.type) {
        case INCREASE_PRODUCT_QTY:
        case REMOVE_PRODUCT:
            if (newState.page < maxPage) {
                return newState;
            }
            return objectAssign({}, newState, {
                page: maxPage
            });
        case REQUEST_PRODUCT:
            if (!newProductAdded) {
                return newState;
            }
            return objectAssign({}, newState, {
                page: maxPage
            });
        case CHANGE_PAGE:
            return objectAssign({}, newState, {
                page: Math.max(0, Math.min(newState.page + action.count, maxPage))
            });
        case CLEAR_PRODUCTS:
            if (newState.page < maxPage) {
                return newState;
            }
            return objectAssign({}, newState, {
                page: maxPage
            });
        default:
            return newState;
    }
}
