import * as Actions from '../actions/bar';

const defaultState = {
  isFetching: false,
  points: [],
};

export function bar(state = defaultState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BAR:
      return {
        ...state,
        distance: action.route.distance,
        duration: action.route.duration,
        // Create a path which joins the last point to the
        // actual destination point
        points: [...action.route.points, action.location],
        location: action.location,
        name: action.name,
        isFetching: false,
      };
    case Actions.REQUEST_BAR:
      return {
        ...state,
        isFetching: true,
      };
    case Actions.RECEIVE_BAR_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
