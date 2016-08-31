/**
 * Created by oren on 8/29/16.
 */
import {fromJS, Record, OrderedMap} from 'immutable';
import initialState from './initialState';

const {
  ADD_LOCATION,
  REMOVE_LOCATION,
  EDIT_LOCATION,
  VIEW_LOCATION,
  INITIAL_LOCATIONS_LIST
  } = require( '../constants/actionTypes');

export default function locationsReducer(state = initialState, action) {
  console.log(`${action.type} : `,action.data);
  switch (action.type) {
    case INITIAL_LOCATIONS_LIST:
      return state.setIn(['locations'], OrderedMap(action.data));;
    case VIEW_LOCATION:
      return state.setIn(['currentId'],action.data.currentId);
    case ADD_LOCATION:
      return state.setIn(['locations',action.data.lid],action.data.dataLocation);
    case REMOVE_LOCATION:
      return state.deleteIn(['locations',action.data]);
    case EDIT_LOCATION:
      return state.updateIn(['locations',action.data.lid], val =>action.data.dataLocation);
    default:
      return state;
  }
}
