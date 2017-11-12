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
        location: action.location,
        name: action.name,
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
    default:
      return state;
  }
}
