/**
 * Created by oren on 8/29/16.
 */
import {ADD_LOCATION, REMOVE_LOCATION,EDIT_LOCATION} from '../constants/actionTypes';
import {fromJS, Record} from 'immutable';
import initialState from './initialState';

const {
  ADD_LOCATION,
  REMOVE_LOCATION,
  EDIT_LOCATION,
  VIEW_LOCATION,
  INITIAL_LOCATIONS_LIST
  } = require( '../constants/actionTypes');

export default function locationsReducer(state = initialState.location, action) {
  let newState;

  switch (action.type) {
    case INITIAL_LOCATIONS_LIST:
      return state.setIn(['locations'], OrderedMap(action.data));;
    case VIEW_LOCATION:
      return state.setIn(['currentId'],action.data.currentId);
    case ADD_LOCATION:
      return state.setIn(['locations',action.data.cid],action.data.name);
    case REMOVE_LOCATION:
      return state.deleteIn(['locations',action.data]);
    case EDIT_LOCATION:
      return state.updateIn(['locations',action.data.cid], val =>action.data.name);
    default:
      return state;
  }
}
