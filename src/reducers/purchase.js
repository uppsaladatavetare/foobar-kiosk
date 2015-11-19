import {
  NEW_PURCHASE, PENDING_PURCHASE, FINALIZE_PURCHASE, END_PURCHASE
} from '../actions/purchase'

export function purchase(state = {state: 'WAITING'}, action) {
  switch (action.type) {
    case NEW_PURCHASE:
      return Object.assign({}, state, {
        state: 'ONGOING'
      });
    case PENDING_PURCHASE:
      return Object.assign({}, state, {
        state: 'PENDING'
      });
    case FINALIZE_PURCHASE:
      return Object.assign({}, state, {
        state: 'FINALIZED',
        cost: action.data.amount
      });
    case END_PURCHASE:
      return Object.assign({}, state, {
        state: 'WAITING'
      });
    default:
      return state;
  }
}
