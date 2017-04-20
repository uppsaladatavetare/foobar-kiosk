import { combineReducers } from "redux";

import { products, IState as IProductState } from "reducers/product";
import { account, IState as IAccountState } from "reducers/account";
import { purchase, IState as IPurchaseState } from "reducers/purchase";

export interface IState {
    products: IProductState;
    account: IAccountState;
    purchase: IPurchaseState;
}

const rootReducer = combineReducers({
    account,
    products,
    purchase
});

export default function(state: any = {}, action: any) {
    if (action.type === '_LOAD_STATE') {
        return action.data.state;
    }
    return rootReducer(state, action);
}
