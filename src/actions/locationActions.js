import * as types from '../constants/actionTypes';


export function addLocation(data) {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_LOCATION,
      data
    });
  };
}

export function removeLocation(data) {
  return function (dispatch) {
    return dispatch({
      type: types.REMOVE_LOCATION,
      data
    });
  };
}

export function editLocation(data) {
  return function (dispatch) {
    return dispatch({
      type: types.EDIT_LOCATION,
      data
    });
  };
}
