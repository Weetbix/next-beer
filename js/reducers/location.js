import * as Actions from '../actions/location';

export function location(state = {}, action) {
  switch (action.type) {
    case Actions.UPDATE_LOCATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    default:
      return state;
  }
}
