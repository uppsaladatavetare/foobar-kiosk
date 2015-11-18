import { combineReducers } from 'redux';
import { products } from './product';
import { account } from './account';
import { purchase } from './purchase';

const rootReducer = combineReducers({
  account,
  products,
  purchase
});

export default rootReducer;
