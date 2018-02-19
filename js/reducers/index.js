import {combineReducers} from 'redux';

import {bar} from './bar';
import {location} from './location';
import {settings} from './settings';

export default combineReducers({
  bar,
  location,
  settings,
});
