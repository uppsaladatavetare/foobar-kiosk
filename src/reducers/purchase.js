import {
  NEW_PURCHASE, PENDING_PURCHASE, FINALIZE_PURCHASE, END_PURCHASE
} from '../actions/purchase'

export function purchase(state = {}, action) {
  switch (action.type) {
    case NEW_PURCHASE:
      return Object.assign({}, state, {
        started: true,
        pending: false,
        finalizied: false,
      });
    case PENDING_PURCHASE:
      return Object.assign({}, state, {
        pending: true
      });
    case FINALIZE_PURCHASE:
      return Object.assign({}, state, {
        started: false,
        pending: false,
        finalized: true,
        cost: action.data.amount
      });
    case END_PURCHASE:
      return Object.assign({}, state, {
        finalized: false,
      });
    default:
      return state;
  }
}
