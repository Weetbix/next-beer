import PlacesAPI from './places.api.key';

export async function getNextBar(currentLocation) {
  const location = `${currentLocation.latitude},${currentLocation.longitude}`;

  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&rankby=distance&type=bar&key=${PlacesAPI.key}`,
    );

    const respJson = await resp.json();

    if (respJson && respJson.results) {
      // todo, filter by open now

      // take randomly from the top 5
      const index = Math.floor(Math.random() * 5);

      const bar = respJson.results[index];
      const {location} = bar.geometry;
      return {
        name: bar.name,
        location: {
          latitude: location.lat,
          longitude: location.lng,
        },
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
