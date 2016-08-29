import * as types from '../constants/actionTypes';
var _ = require('lodash');

export function initialCategoriesList() {
  console.log('initAction');
  return function (dispatch) {
    let data = JSON.parse(localStorage.getItem('Categories'));
    localStorage.setItem('AddedCategory',['School'])
    return dispatch({
      type: types.INITIAL_CATEGORIES_LIST,
      data
    });
  };
}


export function addCategory(name) {
  console.log('addAction');
  return function (dispatch) {
    let cid = 'c' + Date.now(),categoriesLocalStorage = {},currentLocalStorage;
    if(name){
      categoriesLocalStorage[cid] = name;
      currentLocalStorage = JSON.parse(localStorage.getItem('Categories'));
      Object.assign(categoriesLocalStorage,currentLocalStorage);
      localStorage.setItem('Categories',JSON.stringify(categoriesLocalStorage));
    }
    return dispatch({
      type: types.ADD_CATEGORY,
      data: {cid,name}
    });
  };
}

export function removeCategory(data) {
  console.log('rmAction');
  return function (dispatch) {
    let lsList = JSON.parse(localStorage.getItem('Categories'));
        delete lsList[data];
        localStorage.removeItem('Categories');
        localStorage.setItem('Categories',JSON.stringify(lsList));
    return dispatch({
      type: types.REMOVE_CATEGORY,
      data
    });
  };
}

export function editCategory(cid,name) {
  console.log('editAction');
  let lsList = JSON.parse(localStorage.getItem('Categories'));
  Object.assign(lsList,{[cid]:name});
  localStorage.setItem('Categories',JSON.stringify(lsList));
  localStorage.setItem('AddedCategory',[name])
  return function (dispatch) {
    return dispatch({
      type: types.EDIT_CATEGORY,
      data: {cid,name}
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

