"use strict";
import {Record, Map, OrderedMap} from 'immutable';

const InitialState = Map({
  categories: OrderedMap(),
  currentId: ''
});

export default InitialState;

