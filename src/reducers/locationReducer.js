import {ADD_LOCATION, REMOVE_LOCATION,EDIT_LOCATION} from '../constants/actionTypes';
import {fromJS, Record} from 'immutable';
import initialState from './initialState';

//const initialState = new InitialState();

export default function locationReducer(state = initialState.location, action) {
  let newState;

  switch (action.type) {
    case ADD_LOCATION:
      return state;

    case REMOVE_LOCATION:
      return state;
    case EDIT_LOCATION:
      return state;

    default:
      return state;
  }
}
