import {
  REQUEST_ACCOUNT, LOGIN_ACCOUNT
} from '../actions/account'

export function account(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
