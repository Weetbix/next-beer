import Polyline from '@mapbox/polyline';

export async function getDirections(from, to) {
  const startLoc = `${from.lat}, ${from.long}`;
  const destinationLoc = `${to.lat}, ${to.long}`;

  try {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=${startLoc}&destination=${destinationLoc}`,
    );

    let respJson = await resp.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);

    return points.map(point => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
