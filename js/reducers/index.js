import {combineReducers} from 'redux';

import {RESET_STORE} from '../actions/reset';

import {bar} from './bar';
import {location} from './location';
import {settings} from './settings';

const appReducer = combineReducers({
  bar,
  location,
  settings,
});

// Wrap our normal application root reducer in another
// reducer which will check for the RESET_STORE action
// and will pass undefined as the state to our reducers.
// This will cause the reducers to return their default
// state and effectively clear all the store back to default
// At a later point we may want to allow each reducer to
// handle this action themselves for higher fidelity
export default function rootReducer(state, action) {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
}
