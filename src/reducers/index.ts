import { combineReducers } from "redux";

import { products } from "reducers/product";
import { account } from "reducers/account";
import { purchase } from "reducers/purchase";

const rootReducer = combineReducers({
    account,
    products,
    purchase
});

export default rootReducer;
