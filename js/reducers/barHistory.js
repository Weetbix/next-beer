import * as Actions from '../actions/barHistory';

const defaultState = [];

export function barHistory(state = defaultState, action) {
  switch (action.type) {
    case Actions.ADD_BAR_TO_HISTORY:
      return [
        ...state,
        {
          name: action.name,
          location: action.location,
          points: action.points,
        },
      ];
    default:
      return state;
  }
}
