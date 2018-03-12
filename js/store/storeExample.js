store = {
  // Users current location
  location: {
    latitude: 43.50,
    longitute: 34.54,
  },
  // Current bar we are going to
  bar: {
    isFetching: true / false,
    distance : '100 m', 
    duration : '10 mins',
    points : [
      // from polyline
      {
        latitude : 54.3,
        longitude : 23.4,
      },
      // etc
    ]
    name: 'bar name',
    location: {
      latitude: 43.5,
      longitude: 23.5,
    },
  },
  barHistory: [
    // Earliest bars first
    {
      name : 'bar name',
      location: {
        latitude : 43.5,
        longitude : 53.3
      },
      points : [
        {
          latitude : 43.5,
          longitude : 32.3
        }
        // etc
      ]
    },
    {
      // Etc etc
    }
  ]
  // User settings
  settings: {
    minimumBarRating: 30,
    maximumBarRating: 40,
    // etc
  },
};
