import React from 'react';
import PropTypes from 'prop-types';
import {MapView} from 'expo';
import DarkTheme from './NavMap.DarkTheme';
import isEqual from 'lodash/isEqual';

// How much padding to put around the edge of the
// map when fitting to the navigation path
const MAP_EDGE_PADDING = {
  top: 200,
  right: 200,
  bottom: 200,
  left: 200,
};

export default class NavMap extends React.Component {
  static propTypes = {
    // The initial center for the map, this will only be
    // used on initial display of the map
    initialCenter: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,

    // An array of long/lat points which will be drawn
    // on the map
    coords: PropTypes.arrayOf(
      PropTypes.shape({
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      }),
    ).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.coords, nextProps.coords)) {
      // fit to new coords
      this.mapView.fitToCoordinates(nextProps.coords, {
        edgePadding: MAP_EDGE_PADDING,
        animated: true,
      });
    }
  }

  render() {
    const initialRegion = {
      ...this.props.initialCenter,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    return (
      <MapView
        ref={c => {
          this.mapView = c;
        }}
        style={{flex: 1}}
        customMapStyle={DarkTheme}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={initialRegion}
      >
        {this.props.coords.length > 0 &&
          <MapView.Marker
            coordinate={{
              latitude: this.props.coords[
                this.props.coords.length - 1
              ].latitude,
              longitude: this.props.coords[
                this.props.coords.length - 1
              ].longitude,
            }}
            image={require('../../assets/beer.png')}
            anchor={{x: 0.5, y: 0.5}}
          />}
        <MapView.Polyline
          coordinates={this.props.coords}
          strokeWidth={8}
          strokeColor="#FFFFFF77"
        />
        <MapView.Polyline
          coordinates={this.props.coords}
          strokeWidth={5}
          strokeColor="#f4ce42"
        />
      </MapView>
    );
  }
}
