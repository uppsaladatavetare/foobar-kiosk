import { combineReducers } from 'redux';
import {
  ADD_PRODUCT, SELECT_PRODUCT, INCREASE_PRODUCT_QTY, REMOVE_PRODUCT,
  REQUEST_PRODUCT, CHANGE_PAGE, REQUEST_ACCOUNT, LOGIN_ACCOUNT
} from '../actions';

import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

function account(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function _products(state, action) {
  switch (action.type) {
    case REQUEST_PRODUCT:
      var product = state.products.find((p) => p.ean == action.ean);
      if (!product) {
        return Object.assign({}, state, {
          products: [...state.products, {
            ean: action.ean,
            selected: false,
            loading: true
          }]
        });
      }
      else {
        return state;
      }
    case ADD_PRODUCT:
      var product = state.products.find((p) => p.ean == action.code);
      if (product.loading) {
        return Object.assign({}, state, {
          products: state.products.map(
            (p) => {
              if (p.ean == action.code) {
                return {
                  ...p,
                  name: action.name,
                  selected: false,
                  loading: false,
                  qty: 1,
                  price: action.price,
                  image: `http://dev.foocash.me${action.image}`
                }
              }
              else {
                return p;
              }
            }
          )
        });
      }
      else {
        return Object.assign({}, state, {
          products: state.products.map(
            (p) => ({...p, qty: p.qty + (p.ean == action.code ? 1 : 0)})
          )
        });
      }
    case SELECT_PRODUCT:
      return Object.assign({}, state, {
        products: state.products.map(
          (p) => ({...p, selected: (p.ean == action.ean ? !p.selected : p.selected)})
        )
      });
    case INCREASE_PRODUCT_QTY:
      return Object.assign({}, state, {
        products: state.products.map(
          (p) => ({...p, qty: p.qty + (p.selected ? action.count : 0)})
        ).filter(
          (p) => p.qty > 0
        )
      });
    case REMOVE_PRODUCT:
      return Object.assign({}, state, {
        products: state.products.filter((p) => !p.selected)
      });
    default:
      return state;
  }
}

function products(state = {products: [], page: 0}, action) {
  var preCount = state.products.length;
  var newState = _products(state, action);
  var postCount = newState.products.length;
  var newProductAdded = postCount > preCount;
  var maxPage = Math.max(0, Math.floor((postCount - 4) / 3));

  newState = Object.assign({}, newState, {maxPage});

  switch (action.type) {
    case INCREASE_PRODUCT_QTY:
    case REMOVE_PRODUCT:
      if (newState.page < maxPage)
        return newState;
      return Object.assign({}, newState, {
        page: maxPage
      });
    case REQUEST_PRODUCT:
      if (!newProductAdded)
        return newState;
      return Object.assign({}, newState, {
        page: maxPage
      });
    case CHANGE_PAGE:
      return Object.assign({}, newState, {
        page: Math.max(0, Math.min(newState.page + action.count, maxPage))
      });
    default:
      return newState;
  }
}

const rootReducer = combineReducers({
  account,
  products
});

export default rootReducer;
