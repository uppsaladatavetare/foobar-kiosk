import * as Redux from "redux";

import { NEW_PURCHASE, PENDING_PURCHASE, FINALIZE_PURCHASE, END_PURCHASE } from "actions/purchase";

export interface IState {
    state: string;
    cost?: number;
}

interface IAction extends Redux.Action {
    data: {
        amount?: number;
    };
}

export function purchase(state: IState = { state: "WAITING" }, action: IAction) {
    switch (action.type) {
        case NEW_PURCHASE:
            return {
                state: "ONGOING"
            };
        case PENDING_PURCHASE:
            return {
                state: "PENDING"
            };
        case FINALIZE_PURCHASE:
            return {
                state: "FINALIZED",
                cost: action.data.amount
            };
        case END_PURCHASE:
            return {
                state: "WAITING"
            };
        default:
            return state;
    }
}
