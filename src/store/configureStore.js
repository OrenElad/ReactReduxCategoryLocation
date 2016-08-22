"use strict";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';
import InitialState from '../reducers/initialState';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
};

function getInitialState() {
  return {
    initialState: new InitialState()
  };
}

const store = configureStore(getInitialState());

export default store;
