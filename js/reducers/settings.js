import cloneDeep from 'lodash/cloneDeep';
import * as Constants from '../constants';
import * as Actions from '../actions/settings';

// see https://developers.google.com/places/web-service/supported_types
const DEFAULT_FILTER_BAR_TYPES = [
  {id: 'cafe', label: 'Cafe', value: true},
  {id: 'casino', label: 'Casino', value: true},
  {id: 'night_club', label: 'Night Club', value: true},
  {id: 'restaurant', label: 'Restaurant', value: true},
];

// Default settings
const defaultState = {
  minimumBarDistance: Constants.MIN_BAR_DISTANCE,
  maximumBarDistance: Constants.MAX_BAR_DISTANCE,
  filterBarTypes: DEFAULT_FILTER_BAR_TYPES,
};

export function settings(state = defaultState, action) {
  switch (action.type) {
    case Actions.UPDATE_SETTING:
      return {
        ...state,
        [action.key]: cloneDeep(action.value),
      };
    default:
      return state;
  }
}
