import {
  REQUEST_ACCOUNT, LOGIN_ACCOUNT, CLEAR_ACCOUNT
} from '../actions/account';

export function account(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT:
      return Object.assign({}, state, {
        balance: action.data.balance,
        id: action.data.id,
        name: action.data.name
      });
    case CLEAR_ACCOUNT:
      return Object.assign({}, state, {
        balance: undefined,
        id: undefined,
        name: undefined
      });
    default:
      return state;
  };
};
