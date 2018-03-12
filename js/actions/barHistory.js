export const ADD_BAR_TO_HISTORY = 'ADD_BAR_TO_HISTORY';

export function addBarToHistory(points, location, name) {
  return {
    type: ADD_BAR_TO_HISTORY,
    points,
    location,
    name,
  };
}
