
import {OrderedMap} from 'immutable';
import initialState from './initialState';

const {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  EDIT_CATEGORY,
  VIEW_CATEGORY,
  INITIAL_CATEGORIES_LIST
} = require( '../constants/actionTypes');

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_CATEGORIES_LIST:
      return state.setIn(['categories'], OrderedMap(action.data));
    case VIEW_CATEGORY:
      return state.setIn(['currentId'],action.data.currentId);
    case ADD_CATEGORY:
      return state.setIn(['categories',action.data.cid],action.data.name);
    case REMOVE_CATEGORY:
      return state.deleteIn(['categories',action.data]);
    case EDIT_CATEGORY:
      return state.updateIn(['categories',action.data.cid], val =>action.data.name);
    default:
      return state;
  }
}
