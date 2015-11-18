import {
  ADD_PRODUCT, SELECT_PRODUCT, INCREASE_PRODUCT_QTY, REMOVE_PRODUCT,
  REQUEST_PRODUCT, CHANGE_PAGE, PENDING_PURCHASE, FINALIZE_PURCHASE
} from '../actions/product';

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
                  id: action.id,
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
    case PENDING_PURCHASE:
      return state;
    case FINALIZE_PURCHASE:
      return Object.assign({}, state, {
        products: []
      });
    default:
      return state;
  }
}

export function products(state = {products: [], page: 0}, action) {
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
