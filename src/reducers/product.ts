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
            const productIndex = state.products.map((product) => {
                return product.code;
            }).indexOf(action.code);

            if (productIndex === -1) {
                return Object.assign({}, state, {
                    products: [...state.products, {
                        code: action.code,
                        selected: false,
                        loading: true
                    }]
                });
            }

            return state;
        case ADD_PRODUCT:
            const selectedProduct = state.products.filter((product) => {
                return action.product && product.code === action.product.code;
            })[0];

            if (selectedProduct.loading) {
                return Object.assign({}, state, {
                    products: state.products.map((product) => {
                        if (action.product && product.code === action.product.code) {
                            return Object.assign(product, {
                                id: action.product.id,
                                name: action.product.name,
                                selected: false,
                                loading: false,
                                qty: 1,
                                price: action.product.price,
                                image: config.API.host + action.product.image
                            });
                        } else {
                            return product;
                        }
                    })
                });
            }

            return Object.assign({}, state, {
                products: state.products.map((product) => {
                    if (action.product && product.code === action.product.code) {
                        return Object.assign(product, {
                            qty: product.qty + 1
                        });
                    }
                    return product;
                })
            });
        case SELECT_PRODUCT:
            return Object.assign({}, state, {
                products: state.products.map((product) => {
                    return Object.assign(product, {
                        selected: (product.code === action.code ? !product.selected : product.selected)
                    });
                })
            });
        case INCREASE_PRODUCT_QTY:
            return Object.assign({}, state, {
                products: state.products.map((product) => {
                    return Object.assign(product, {
                        qty: product.qty + (product.selected ? (action.count || 0) : 0)
                    });
                }).filter((product) => {
                    return product.qty > 0;
                })
            });
        case REMOVE_PRODUCT:
            if (action.code) {
                return Object.assign({}, state, {
                    products: state.products.filter((product) => {
                        return product.code !== action.code;
                    })
                });
            }

            return Object.assign({}, state, {
                products: state.products.filter((product) => {
                    return !product.selected;
                })
            });
        case CLEAR_PRODUCTS:
            return Object.assign({}, state, {
                products: []
            });
        case FAILED_PRODUCT:
            return Object.assign({}, state, {
                products: state.products.map((product) => {
                    if (product.code === action.code) {
                        return Object.assign(product, {
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
    const newProductAdded = newState.products.length > state.products.length;
    const maxPage = Math.max(0, Math.floor((newState.products.length - 4) / 3));

    newState = Object.assign({}, newState, { maxPage });

    switch (action.type) {
        case INCREASE_PRODUCT_QTY:
        case REMOVE_PRODUCT:
            if (newState.page < maxPage) {
                return newState;
            }
            return Object.assign({}, newState, {
                page: maxPage
            });
        case REQUEST_PRODUCT:
            if (!newProductAdded) {
                return newState;
            }
            return Object.assign({}, newState, {
                page: maxPage
            });
        case CHANGE_PAGE:
            return Object.assign({}, newState, {
                page: Math.max(0, Math.min(newState.page + (action.count || 0), maxPage))
            });
        case CLEAR_PRODUCTS:
            if (newState.page < maxPage) {
                return newState;
            }
            return Object.assign({}, newState, {
                page: maxPage
            });
        default:
            return newState;
    }
}
