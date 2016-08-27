import * as Redux from "redux";

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

interface StateProps {
    products: any;
    page: number;
}

interface ActionProps extends Redux.Action {
    id: string;
    name: string;
    ean: string;
    code: string;
    price: number;
    image: string;
    count?: number;
}

function _products(state: StateProps, action: ActionProps) {
    let product: any;

    switch (action.type) {
        case REQUEST_PRODUCT:
            product = state.products.find((product: any) => {
                return product.ean === action.ean;
            });

            if (!product) {
                return objectAssign({}, state, {
                    products: [...state.products, {
                        ean: action.ean,
                        selected: false,
                        loading: true
                    }]
                });
            } else {
                return state;
            }
        case ADD_PRODUCT:
            product = state.products.find((product: any) => {
                return product.ean === action.code;
            });

            if (product.loading) {
                return objectAssign({}, state, {
                    products: state.products.map((product: any) => {
                        if (product.ean === action.code) {
                            return objectAssign(product, {
                                id: action.id,
                                name: action.name,
                                selected: false,
                                loading: false,
                                qty: 1,
                                price: action.price,
                                image: `http://dev.foocash.me${action.image}`
                            });
                        } else {
                            return product;
                        }
                    })
                });
            } else {
                return objectAssign({}, state, {
                    products: state.products.map((product: any) => {
                        return objectAssign(product, {
                            qty: product.qty + (product.ean === action.code ? 1 : 0)
                        });
                    })
                });
            }
        case SELECT_PRODUCT:
            return objectAssign({}, state, {
                products: state.products.map((product: any) => {
                    return objectAssign(product, {
                        selected: (product.ean === action.ean ? !product.selected : product.selected)
                    });
                })
            });
        case INCREASE_PRODUCT_QTY:
            return objectAssign({}, state, {
                products: state.products.map((product: any) => {
                    return objectAssign(product, {
                        qty: product.qty + (product.selected ? action.count : 0)
                    });
                }).filter((product: any) => {
                    return product.qty > 0;
                })
            });
        case REMOVE_PRODUCT:
            if (action.ean) {
                return objectAssign({}, state, {
                    products: state.products.filter((product: any) => {
                        return product.ean !== action.ean;
                    })
                });
            } else {
                return objectAssign({}, state, {
                    products: state.products.filter((product: any) => {
                        return !product.selected;
                    })
                });
            }
        case CLEAR_PRODUCTS:
            return objectAssign({}, state, {
                products: []
            });
        case FAILED_PRODUCT:
            return objectAssign({}, state, {
                products: state.products.map((product: any) => {
                    if (product.ean === action.ean) {
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

export function products(state: StateProps = { products: [], page: 0 }, action: ActionProps) {
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
