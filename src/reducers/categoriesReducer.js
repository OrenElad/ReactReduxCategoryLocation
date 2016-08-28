/**
 * Created by oren on 8/25/16.
 */
import {fromJS, Record} from 'immutable';
import initialState from './initialState';

const {
  ADD_CATEGORY, 
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
  VIEW_CATEGORY
} = require( '../constants/actionTypes');

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case VIEW_CATEGORY:
      return state.setIn(['currentId'],action.data.currentId);
    case ADD_CATEGORY:
      return state.setIn(['categories',action.data.cid],action.data.name);
    case REMOVE_CATEGORY:
      return state;
    case EDIT_CATEGORY:
          return state;
    default:
      return state;
  }
}
