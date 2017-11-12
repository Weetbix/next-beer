import {getDirections} from '../api/directions';
import {getNextBar} from '../api/places';

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const RECEIVE_ROUTE_FAILED = 'RECEIVE_ROUTE_FAILED';

export function requestRoute() {
  return {
    type: REQUEST_ROUTE,
  };
}

export function receiveRoute(route, location, name) {
  return {
    type: RECEIVE_ROUTE,
    route,
    location,
    name,
  };
}

export function receiveRouteFailed() {
  return {
    type: RECEIVE_ROUTE_FAILED,
  };
}

export function fetchRoute(from, to, name) {
  return async dispatch => {
    dispatch(requestRoute());

    try {
      const points = await getDirections(from, to);
      dispatch(receiveRoute(points, to, name));
    } catch (error) {
      dispatch(receiveRouteFailed());
    }
  };
}

export function navigateToNextBar(currentLocation) {
  return async dispatch => {
    const nextBar = await getNextBar(currentLocation);

    if (nextBar) {
      dispatch(fetchRoute(currentLocation, nextBar.location, nextBar.name));
    }
  };
}
