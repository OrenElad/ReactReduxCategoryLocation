"use strict";
import {Record, Map, List} from 'immutable';

const InitialState = Record({
  categories: List(),
  location: {
    name: 'A',
    address: 'A1',
    coordinates: [],
    category: ''
  }
});

export default InitialState;

