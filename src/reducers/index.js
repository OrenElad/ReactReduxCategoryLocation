import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import categories from './categoriesReducer';
import location from './locationReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  //fuelSavings,
  categories,
  // location,
  routing: routerReducer
});

export default rootReducer;
