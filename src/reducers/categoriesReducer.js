import {ADD_CATEGORY, REMOVE_CATEGORY,EDIT_CATEGORY } from '../constants/actionTypes';
import {fromJS, Record} from 'immutable';
import initialState from './initialState';

export default function categoriesReducer(state = initialState.categories, action) {
  let newState;

  switch (action.type) {
    case ADD_CATEGORY:
      return state.set('categories', fromJS(action.data));
    case REMOVE_CATEGORY:
      return state;

    case EDIT_CATEGORY:
          return state;
    default:
      return state;
  }
}
