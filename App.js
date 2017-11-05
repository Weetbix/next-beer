import React from 'react';
import Polyline from '@mapbox/polyline'; // 0.2.0
import {MapView} from 'expo';
import {Image} from 'react-native';

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

class Map extends React.Component {
  state = {
    coords: [],
  };

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.directionTo) !==
      JSON.stringify(nextProps.directionTo)
    ) {
      this.updateDirections(nextProps.center, nextProps.directionTo);
    }
  }

  componentDidMount() {
    if (!this.state.directions && this.props.directionTo) {
      this.updateDirections(this.props.center, this.props.directionTo);
    }
  }

  // Calls the direction service and updates the route
  async updateDirections(from, to) {
    const startLoc = `${from.lat}, ${from.long}`;
    const destinationLoc = `${to.lat}, ${to.long}`;

    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=${startLoc}&destination=${destinationLoc}`,
      );

      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      this.setState({coords: coords});
      this.mapView.fitToCoordinates(coords, {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100,
        },
        animated: true,
      });
      return coords;
    } catch (error) {
      // alert(error);
      console.log(error);
      return error;
    }
  }

  render() {
    return (
      <MapView
        ref={c => {
          this.mapView = c;
        }}
        style={{flex: 1}}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: this.props.center.lat,
          longitude: this.props.center.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {this.state.coords.length > 0 &&
          <MapView.Marker
            coordinate={{
              latitude: this.state.coords[
                this.state.coords.length - 1
              ].latitude,
              longitude: this.state.coords[
                this.state.coords.length - 1
              ].longitude,
            }}
            image={require('./assets/beer.png')}
            anchor={{x: 0.5, y: 0.5}}
          />}
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={8}
          strokeColor="#FFFFFF77"
        />
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={5}
          strokeColor="#f4ce42"
        />
      </MapView>
    );
  }
}

export default class App extends React.Component {
  state = {
    center: {lat: 52.4685913, long: 13.4309139},
    directionsTo: {lat: 52.4685913, long: 13.4309139},
  };

  componentDidMount() {
    setInterval(
      () => {
        this.setState({
          center: {
            lat: this.state.center.lat + (Math.random() * 2 - 1) * 0.01,
            long: this.state.center.long + (Math.random() * 2 - 1) * 0.01,
          },
          directionsTo: {
            lat: this.state.center.lat + (Math.random() * 2 - 1) * 0.01,
            long: this.state.center.long + (Math.random() * 2 - 1) * 0.01,
          },
        });
      },
      5000,
    );
  }

  render() {
    return (
      <Map center={this.state.center} directionTo={this.state.directionsTo} />
    );
  }
}
