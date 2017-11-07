import Polyline from '@mapbox/polyline';

// Returns:
// {
//   points : [lat,long],
//   duration,
//   distance
// }
export async function getDirections(from, to) {
  const startLoc = `${from.latitude}, ${from.longitude}`;
  const destinationLoc = `${to.latitude}, ${to.longitude}`;

  try {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=${startLoc}&destination=${destinationLoc}`,
    );

    let respJson = await resp.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);

    return {
      distance: respJson.routes[0].legs[0].distance.text,
      duration: respJson.routes[0].legs[0].duration.text,
      points: points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      }),
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
