import * as Constants from '../constants';
import * as Actions from '../actions/settings';

// Default settings
const defaultState = {
  minimumBarDistance: Constants.MIN_BAR_DISTANCE,
  maximumBarDistance: Constants.MAX_BAR_DISTANCE,
};

export function settings(state = defaultState, action) {
  switch (action.type) {
    case Actions.UPDATE_SETTING:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
