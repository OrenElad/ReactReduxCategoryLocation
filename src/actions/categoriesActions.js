import * as types from '../constants/actionTypes';


export function addCategory(name) {
  return function (dispatch) {
    let cid = 'c' + Date.now();
    return dispatch({
      type: types.ADD_CATEGORY,
      data: {cid,name}
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

export function viewCategory(currentId) {
  return function (dispatch) {
    return dispatch({
      type: types.VIEW_CATEGORY,
      data:{currentId}
    });
  };
}

