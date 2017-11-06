export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export function updateLocation(point) {
  return {
    type: UPDATE_LOCATION,
    longitude: point.longitude,
    latitude: point.latitude,
  };
}
