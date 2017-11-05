import React from 'react';
import Polyline from '@mapbox/polyline'; // 0.2.0
import {MapView} from 'expo';
import DarkTheme from './NavMap.DarkTheme';

export default class NavMap extends React.Component {
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
        customMapStyle={DarkTheme}
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
            image={require('../../assets/beer.png')}
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
