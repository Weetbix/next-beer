import * as Actions from '../actions/route';

const defaultState = {
  isFetching: false,
  points: [],
};

export function route(state = defaultState, action) {
  switch (action.type) {
    case Actions.RECEIVE_ROUTE:
      return {
        ...state,
        ...action.route,
        destination: action.destination,
        isFetching: false,
      };
    case Actions.REQUEST_ROUTE:
      return {
        ...state,
        isFetching: true,
      };
    case Actions.RECEIVE_ROUTE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case Actions.UPDATE_BAR_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}
