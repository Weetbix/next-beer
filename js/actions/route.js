import {getDirections} from '../api/directions';

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const RECEIVE_ROUTE_FAILED = 'RECEIVE_ROUTE_FAILED';

export function requestRoute() {
  return {
    type: REQUEST_ROUTE,
  };
}

export function receiveRoute(points) {
  return {
    type: RECEIVE_ROUTE,
    points,
  };
}

export function receiveRouteFailed() {
  return {
    type: RECEIVE_ROUTE_FAILED,
  };
}

export function fetchRoute(from, to) {
  return async dispatch => {
    dispatch(requestRoute());

    try {
      const points = await getDirections(from, to);
      dispatch(receiveRoute(points));
    } catch (error) {
      dispatch(receiveRouteFailed());
    }
  };
}
