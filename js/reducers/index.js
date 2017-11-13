import {combineReducers} from 'redux';

import {bar} from './bar';
import {location} from './location';

export default combineReducers({
  bar,
  location,
});
