import {combineReducers} from 'redux';

import {route} from './route';
import {location} from './location';

export default combineReducers({
  route,
  location,
});
