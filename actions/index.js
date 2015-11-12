import fetch from 'isomorphic-fetch';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const INCREASE_PRODUCT_QTY = 'INCREASE_PRODUCT_QTY';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';

export function addProduct(ean) {
  return dispatch => {
    dispatch(requestProduct(ean));
    return fetch(`http://dev.foocash.me/api/products/?code=${ean}`, {
        headers: {
          'Authorization': 'Token ###'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          dispatch(receiveProduct(data[0]))
        }
      });
  }
};

export function requestProduct(ean) {
  return {
    type: REQUEST_PRODUCT,
    ean
  };
}

export function receiveProduct(data) {
  return {
    type: ADD_PRODUCT,
    ...data
  }
}

export function increaseProductQty(count) {
  return {
    type: INCREASE_PRODUCT_QTY,
    count
  };
}

export function selectProduct(ean) {
  return {
    type: SELECT_PRODUCT,
    ean
  };
}

export function removeProduct() {
  return {
    type: REMOVE_PRODUCT
  }
};

/* account - TODO: move to a separate module */
export function requestAccount(cardId) {
  return {
    type: REQUEST_ACCOUNT,
    cardId
  };
}

export function receiveAccount(data) {
  return {
    type: LOGIN_ACCOUNT,
    data: data
  }
}

export function login(cardId) {
  return dispatch => {
    dispatch(requestAccount(cardId));
    return fetch(`http://dev.foocash.me/api/accounts/${cardId}/`, {
        headers: {
          'Authorization': 'Token ###'
        }
      })
      .then(response => response.json())
      .then(data => {
        dispatch(receiveAccount(data))
      });
  }
}
