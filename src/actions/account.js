import fetch from 'isomorphic-fetch';
import { newPurchase } from './purchase';

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
export const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';

export function requestAccount(cardId) {
  return {
    type: REQUEST_ACCOUNT,
    cardId
  };
};

export function receiveAccount(data) {
  return {
    type: LOGIN_ACCOUNT,
    data: data
  };
};

export function login(cardId) {
  return (dispatch, getState) => {
    const { account } = getState();
    if(!account.length) {
      dispatch(requestAccount(cardId));
      if(cardId) {
        return fetch(`http://dev.foocash.me/api/accounts/${cardId}/`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token 03be53c1ab8f74edac76bd60695f84f089634c80'
          }
        })
          .then(response => response.json())
          .then(data => {
            dispatch(newPurchase());
            dispatch(receiveAccount(data));
          });
      } else {
        dispatch(newPurchase());
        dispatch(receiveAccount(null));
      };
    };
  };
};

export function clearAccount() {
  return {
    type: CLEAR_ACCOUNT
  };
};
