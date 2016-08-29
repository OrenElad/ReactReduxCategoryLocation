/**
 * Created by oren on 8/29/16.
 */
"use strict";

import categories from './categoriesReducer';
import locations from './locationsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories,
  locations
});

export default rootReducer;
