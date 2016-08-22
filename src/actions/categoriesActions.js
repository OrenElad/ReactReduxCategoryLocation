import * as types from '../constants/actionTypes';


export function addCategory(data) {
  return function (dispatch) {
    return dispatch({
      type: types.ADD_CATEGORY,
      data
    });
  };
}

export function removeCategory(data) {
  return function (dispatch) {
    return dispatch({
      type: types.REMOVE_CATEGORY,
      data
    });
  };
}

export function editCategory(data) {
  return function (dispatch) {
    return dispatch({
      type: types.EDIT_CATEGORY,
      data
    });
  };
}
