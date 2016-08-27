import * as Redux from "redux";

import { NEW_PURCHASE, PENDING_PURCHASE, FINALIZE_PURCHASE, END_PURCHASE } from "actions/purchase";

interface StateProps {
    state: string;
    cost?: number;
}

interface ActionProps extends Redux.Action {
    data: {
        amount?: number;
    };
}

export function purchase(state: StateProps = { state: "WAITING" }, action: ActionProps) {
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
