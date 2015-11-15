import { combineReducers } from 'redux';
import { products } from './product';
import { account } from './account'

const rootReducer = combineReducers({
  account,
  products
});

export default rootReducer;
