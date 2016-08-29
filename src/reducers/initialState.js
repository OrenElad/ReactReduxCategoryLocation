"use strict";
import {Record, Map, OrderedMap} from 'immutable';

const InitialState = Map({
  categories: OrderedMap(),
  currentId: '',
  locations: OrderedMap()
});

export default InitialState;

