import * as Redux from "redux";

import { REQUEST_ACCOUNT, LOGIN_ACCOUNT, CLEAR_ACCOUNT, FAILED_ACCOUNT } from "actions/account";

const objectAssign = require("object-assign");

interface IState { }

interface IAction extends Redux.Action {
    data: any;
}

export function account(state: IState = {}, action: IAction) {
    switch (action.type) {
        case REQUEST_ACCOUNT:
            return objectAssign({}, state, {
                request: true
            });
        case LOGIN_ACCOUNT:
            return action.data ? action.data : {};
        case CLEAR_ACCOUNT:
            return {};
        case FAILED_ACCOUNT:
            return objectAssign({}, state, {
                failed: true
            });
        default:
            return state;
    }
};
