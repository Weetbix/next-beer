import {getDirections} from '../api/directions';
import {getNextBar} from '../api/places';

import {addBarToHistory} from './barHistory';

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

export function navigateToNextBar() {
  return async (dispatch, getState) => {
    const state = getState();
    const {
      minimumBarRating,
      maximumBarRating,
      minimumBarPrice,
      maximumBarPrice,
      filterBarTypes,
    } = state.settings;
    // Convert the settings object to a list of exclude tags
    const excludeTags = filterBarTypes
      .filter(type => type.value === true)
      .map(type => type.id);
    const excludeBarNames = [
      ...state.barHistory.map(previousBar => previousBar.name),
      state.bar.name,
    ];
    const currentLocation = state.location;

    dispatch(requestBar());
    const nextBar = await getNextBar(
      currentLocation,
      excludeBarNames,
      excludeTags,
      minimumBarRating,
      maximumBarRating,
      minimumBarPrice,
      maximumBarPrice,
    );

    if (nextBar) {
      try {
        const {name, location: destination} = nextBar;
        const route = await getDirections(currentLocation, destination);

        // Add the old bar to the history
        if (state.bar.name) {
          const {points, location, name} = state.bar;
          dispatch(addBarToHistory(points, location, name));
        }

        // Show the new bar
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
