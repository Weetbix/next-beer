import * as Actions from '../actions/settings';

// Default settings
const defaultState = {
  minimumBarDistance: 100,
  maximumBarDistance: 1000,
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
