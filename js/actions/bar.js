import {getDirections} from '../api/directions';
import {getNextBar} from '../api/places';

export const REQUEST_BAR = 'REQUEST_BAR';
export const RECEIVE_BAR = 'RECEIVE_BAR';
export const RECEIVE_BAR_FAILED = 'RECEIVE_BAR_FAILED';

export function requestBar() {
  return {
    type: REQUEST_BAR,
  };
}

export function receiveBar(route, location, name) {
  return {
    type: RECEIVE_BAR,
    route,
    location,
    name,
  };
}

export function receiveBarFailed() {
  return {
    type: RECEIVE_BAR_FAILED,
  };
}

// Helper action to convert the settings state to
// a navigateToNextBar call
export function navigateToNextBarWithSettings(currentLocation, settings) {
  const {
    minimumBarRating,
    maximumBarRating,
    minimumBarPrice,
    maximumBarPrice,
    filterBarTypes,
  } = settings;

  // Convert the settings object to a list of exclude tags
  const excludeTags = filterBarTypes
    .filter(type => type.value === true)
    .map(type => type.id);

  return navigateToNextBar(
    currentLocation,
    excludeTags,
    minimumBarRating,
    maximumBarRating,
    minimumBarPrice,
    maximumBarPrice,
  );
}

export function navigateToNextBar(
  currentLocation,
  excludeTags,
  minRating,
  maxRating,
  minPrice,
  maxPrice,
) {
  return async dispatch => {
    dispatch(requestBar());
    const nextBar = await getNextBar(
      currentLocation,
      excludeTags,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
    );

    if (nextBar) {
      try {
        const {name, location: destination} = nextBar;
        const route = await getDirections(currentLocation, destination);
        dispatch(receiveBar(route, destination, name));
      } catch (error) {
        // We couldn't find a path
        dispatch(receiveBarFailed());
      }
    } else {
      // We couldn't find another bar
      dispatch(receiveBarFailed());
    }
  };
}
