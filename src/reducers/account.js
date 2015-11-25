import {
  REQUEST_ACCOUNT, LOGIN_ACCOUNT, CLEAR_ACCOUNT
} from '../actions/account';

export function account(state = {}, action) {
  switch (action.type) {
    case REQUEST_ACCOUNT:
      return Object.assign({}, state, { request: true });
    case LOGIN_ACCOUNT:
      return Object.assign({}, state, (action.data ? action.data : { id: 1 }));
    case CLEAR_ACCOUNT:
      return {};
    default:
      return state;
  };
};
