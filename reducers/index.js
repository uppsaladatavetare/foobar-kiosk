import { combineReducers } from 'redux';
import {
  ADD_PRODUCT, SELECT_PRODUCT, INCREASE_PRODUCT_QTY, REMOVE_PRODUCT,
  REQUEST_PRODUCT, REQUEST_ACCOUNT, LOGIN_ACCOUNT
} from '../actions';

function account(state = {}, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function products(state = {products: []}, action) {
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

const rootReducer = combineReducers({
  account,
  products
});

export default rootReducer;
