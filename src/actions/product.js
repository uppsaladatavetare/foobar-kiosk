import { apiCall } from '../api';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const INCREASE_PRODUCT_QTY = 'INCREASE_PRODUCT_QTY';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const PENDING_PURCHASE = 'PENDING_PURCHASE';
export const FINALIZE_PURCHASE = 'FINALIZE_PURCHASE';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export const FAILED_PRODUCT = 'FAILED_PRODUCT';

class Cache {
  constructor() {
    this.cache = {};
  }

  hasKey(key, allowExpired=false) {
    if (allowExpired)
      return key in this.cache;
    return key in this.cache && (new Date()) < this.cache[key].expires;
  }

  hasExpired(key) {
    if (!(key in this.cache))
      return null;
    return (new Date()) >= this.cache[key].expires;
  }

  add(key, value, ttl) {
    var expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + ttl);

    this.cache[key] = {
      data: value,
      expires: expirationDate
    }
  }

  get(key, allowExpired=false) {
    if (!allowExpired && this.hasKey(key))
      return this.cache[key].data;
    if (allowExpired && key in this.cache)
      return this.cache[key].data;
    return null;
  }
}

class ProductFetcher {
  constructor() {
    this.cache = new Cache();
    this.promises = {};
  }

  productWithEAN(dispatch, ean) {
    if (this.cache.hasKey(ean)) {
      var product = this.cache.get(ean);
      dispatch(requestProduct(ean));
      dispatch(receiveProduct(product));
      return;
    }
    if (ean in this.promises) {
      // fetching of the product in progress
      return this.promises[ean];
    }
    if (this.cache.hasKey(ean, true)) {
      // the product record has expired, but use it anyway
      // and refresh it in background
      dispatch(requestProduct(ean));
      dispatch(receiveProduct(this.cache.get(ean, true)));

      this.promises[ean] = apiCall(`/products/?code=${ean}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          this.cache.add(ean, data[0]);
        }
        delete this.promises[ean];
      });

      return this.promises[ean];
    }

    // product record not found in the cache, fetch it and dispatch
    // appropriate actions
    dispatch(requestProduct(ean));
    this.promises[ean] = apiCall(`/products/?code=${ean}`)
    .then(response => response.json())
    .then(data => {
      if (data.length) {
        this.cache.add(ean, data[0], 5 * 60);
        dispatch(receiveProduct(data[0]))
      } else {
        dispatch(failedProduct(ean));
        setTimeout(() => {
          dispatch(removeProduct(ean));
        }, 2000);
      }
      delete this.promises[ean];
    });

    return this.promises[ean];
  }
}

var fetcher = new ProductFetcher();

export function addProduct(ean) {
  return dispatch => {
    return fetcher.productWithEAN(dispatch, ean);
  }
};

export function requestProduct(ean) {
  return {
    type: REQUEST_PRODUCT,
    ean
  };
};
export function failedProduct(ean) {
  return {
    type: FAILED_PRODUCT,
    ean
  }
};

export function receiveProduct(data) {
  return {
    type: ADD_PRODUCT,
    ...data
  };
};

export function increaseProductQty(count) {
  return {
    type: INCREASE_PRODUCT_QTY,
    count
  };
};

export function selectProduct(ean) {
  return {
    type: SELECT_PRODUCT,
    ean
  };
};

export function removeProduct(ean) {
  return {
    type: REMOVE_PRODUCT,
    ean
  };
};

export function changePage(count) {
  return {
    type: CHANGE_PAGE,
    count
  };
};

export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS
  };
};
