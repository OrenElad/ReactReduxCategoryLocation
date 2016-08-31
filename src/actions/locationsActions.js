/**
 * Created by oren on 8/29/16.
 */
"use strict"
import * as types from '../constants/actionTypes';
var _ = require('lodash');

export function initialLocationsList() {
  console.log('initialLocationsListAction');
  return function (dispatch) {
    let data = JSON.parse(localStorage.getItem('Locations'));
    return dispatch({
      type: types.INITIAL_LOCATIONS_LIST,
      data
    });
  };
}


export function addLocation(dataLocation) {
  console.log('addLocationAction');
  return function (dispatch) {
    let lid = 'l' + Date.now();
    localStorage.setItem('LocationId',[lid])
    return dispatch({
      type: types.ADD_LOCATION,
      data: {lid,dataLocation}
    });
  };
}

export function removeLocation(data) {
  console.log('removeLocationAction');
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

export function editLocation(dataLocation) {
  console.log('editLocationAction');
  let lsList = {},lid=localStorage.getItem('LocationId');
  lsList[lid] = dataLocation;
  localStorage.setItem('Locations',JSON.stringify(lsList));
  return function (dispatch) {
    return dispatch({
      type: types.EDIT_LOCATION,
      data: {lid,dataLocation}
    });
  };
}

export function viewLocation(currentId) {
  console.log('viewLocationAction');
  localStorage.setItem('LocationId',[currentId]);
  return function (dispatch) {
    return dispatch({
      type: types.VIEW_LOCATION,
      data:{currentId}
    });
  };
}

