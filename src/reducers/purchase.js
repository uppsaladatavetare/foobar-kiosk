import {
  NEW_PURCHASE, PENDING_PURCHASE, FINALIZE_PURCHASE, END_PURCHASE
} from '../actions/purchase'

export function purchase(state = {state: 'WAITING'}, action) {
  switch (action.type) {
    case NEW_PURCHASE:
      return {
        state: 'ONGOING'
      };
    case PENDING_PURCHASE:
      return {
        state: 'PENDING'
      };
    case FINALIZE_PURCHASE:
      return {
        state: 'FINALIZED',
        cost: action.data.amount
      };
    case END_PURCHASE:
      return {
        state: 'WAITING'
      };
    default:
      return state;
  }
}
