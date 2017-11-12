import {getDirections} from '../api/directions';
import {getNextBar} from '../api/places';

export const REQUEST_ROUTE = 'REQUEST_ROUTE';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const RECEIVE_ROUTE_FAILED = 'RECEIVE_ROUTE_FAILED';
export const UPDATE_BAR_NAME = 'UPDATE_BAR_NAME';

export function requestRoute() {
  return {
    type: REQUEST_ROUTE,
  };
}

export function receiveRoute(route, destination) {
  return {
    type: RECEIVE_ROUTE,
    route,
    destination,
  };
}

export function receiveRouteFailed() {
  return {
    type: RECEIVE_ROUTE_FAILED,
  };
}

export function updateBarName(name) {
  return {
    type: UPDATE_BAR_NAME,
    name,
  };
}

export function fetchRoute(from, to) {
  return async dispatch => {
    dispatch(requestRoute());

    try {
      const points = await getDirections(from, to);
      dispatch(receiveRoute(points, to));
    } catch (error) {
      dispatch(receiveRouteFailed());
    }
  };
}

export function navigateToNextBar(currentLocation) {
  return async dispatch => {
    const nextBar = await getNextBar(currentLocation);

    if (nextBar) {
      dispatch(updateBarName(nextBar.name));
      dispatch(fetchRoute(currentLocation, nextBar.location));
    }
  };
}
