import PlacesAPI from './places.api.key';

export async function getNextBar(
  currentLocation,
  excludeTags = [],
  minimumRating = 0,
  maximumRating = 5,
  minimumPrice = 1,
  maximumPrice = 4,
) {
  const location = `${currentLocation.latitude},${currentLocation.longitude}`;

  try {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&rankby=distance&type=bar&key=${PlacesAPI.key}`,
    );

    const respJson = await resp.json();

    if (respJson && respJson.results) {
      // console.log(JSON.stringify(respJson, null, 2));

      const results = respJson.results
        .filter(
          // Results may include opening  hours, if they do we should
          // only include open bars, if they don't we should include
          // them anyway as they _might_ be open
          result =>
            !result.opening_hours ||
            !result.opening_hours.open_now ||
            result.opening_hours.open_now,
        )
        .filter(
          // Remove any excluded types passed in
          result =>
            !result.types ||
            excludeTags.every(tag => !result.types.includes(tag)),
        )
        .filter(
          result =>
            !result.rating ||
            (result.rating >= minimumRating && result.rating <= maximumRating),
        )
        .filter(
          result =>
            !result.price_level ||
            (result.price_level >= minimumPrice &&
              result.price_level <= maximumPrice),
        );

      // take randomly from the top 5
      const index = Math.floor(Math.random() * 5);

      const bar = results[index];
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
