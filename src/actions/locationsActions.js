/**
 * Created by oren on 8/29/16.
 */
"use strict"
import * as types from '../constants/actionTypes';
var _ = require('lodash');

export function initialLocationsList() {
  console.log('initAction');
  return function (dispatch) {
    let data = JSON.parse(localStorage.getItem('Locations'));
    localStorage.setItem('AddedLocation',['School'])
    return dispatch({
      type: types.INITIAL_LOCATIONS_LIST,
      data
    });
  };
}


export function addLocation(name) {
  console.log('addAction');
  return function (dispatch) {
    let cid = 'c' + Date.now(),locationsLocalStorage = {},currentLocalStorage;
    if(name){
      locationsLocalStorage[cid] = name;
      currentLocalStorage = JSON.parse(localStorage.getItem('Locations'));
      Object.assign(locationsLocalStorage,currentLocalStorage);
      localStorage.setItem('Locations',JSON.stringify(locationsLocalStorage));
    }
    return dispatch({
      type: types.ADD_LOCATION,
      data: {cid,name}
    });
  };
}

export function removeLocation(data) {
  console.log('rmAction');
  return function (dispatch) {
    let lsList = JSON.parse(localStorage.getItem('Locations'));
    delete lsList[data];
    localStorage.removeItem('Locations');
    localStorage.setItem('Locations',JSON.stringify(lsList));
    return dispatch({
      type: types.REMOVE_LOCATION,
      data
    });
  };
}

export function editLocation(cid,name) {
  console.log('editAction');
  let lsList = JSON.parse(localStorage.getItem('Locations'));
  Object.assign(lsList,{[cid]:name});
  localStorage.setItem('Locations',JSON.stringify(lsList));
  localStorage.setItem('AddedLocation',[name])
  return function (dispatch) {
    return dispatch({
      type: types.EDIT_LOCATION,
      data: {cid,name}
    });
  };
}

export function viewLocation(currentId) {
  return function (dispatch) {
    return dispatch({
      type: types.VIEW_LOCATION,
      data:{currentId}
    });
  };
}

