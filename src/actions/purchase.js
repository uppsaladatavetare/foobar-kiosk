import fetch from 'isomorphic-fetch';
import { clearProducts } from './product';
import { clearAccount } from './account';

export const NEW_PURCHASE = 'NEW_PURCHASE';
export const PENDING_PURCHASE = 'PENDING_PURCHASE';
export const FINALIZE_PURCHASE = 'FINALIZE_PURCHASE';
export const END_PURCHASE = 'END_PURCHASE';

export function newPurchase() {
  return {
    type: NEW_PURCHASE
  };
};

export function pendingPurchase() {
  return {
    type: PENDING_PURCHASE
  };
};

export function finalizePurchase(data) {
  return {
    type: FINALIZE_PURCHASE,
    data
  };
};

export function endPurchase() {
  return {
    type: END_PURCHASE
  };
};

export function requestPurchase() {
  return (dispatch, getState) => {
    dispatch(pendingPurchase());
    const {
      account,
      products
    } = getState();
    return fetch(`http://dev.foocash.me/api/purchases/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ###'
      },
      body: JSON.stringify({
        account_id: account.id,
        products: products.products.map((p) => ({ id: p.id, qty: p.qty }))
      })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(clearProducts());
        dispatch(clearAccount());
        dispatch(finalizePurchase(data));
        setTimeout(() => {
          dispatch(endPurchase());
        }, 5000);
      });
  };
};
