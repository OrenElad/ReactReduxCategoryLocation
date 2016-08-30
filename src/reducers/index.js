import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import categories from './categoriesReducer';
import locations from './locationsReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  categories,
  locations,
  routing: routerReducer
});

export default rootReducer;
