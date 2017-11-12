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

const COORDINATE_PROPTYPE = PropTypes.shape({
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
});

export default class NavMap extends React.Component {
  static propTypes = {
    // The initial center for the map, this will only be
    // used on initial display of the map
    initialCenter: COORDINATE_PROPTYPE.isRequired,

    // An array of long/lat points which will be drawn on the map
    coords: PropTypes.arrayOf(COORDINATE_PROPTYPE).isRequired,

    // The cooridnates of the destination
    destination: COORDINATE_PROPTYPE,
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
    const {
      initialCenter,
      coords,
      destination,
    } = this.props;

    const initialRegion = {
      ...initialCenter,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    // Create a path which joins the last point to the
    // actual destination point
    const path = coords.length > 0 ? [...coords, destination] : [];

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
        {coords.length > 0 &&
          <MapView.Marker
            coordinate={destination}
            image={require('../../assets/beer.png')}
            anchor={{x: 0.5, y: 0.5}}
          />}
        <MapView.Polyline
          coordinates={path}
          strokeWidth={8}
          strokeColor="#FFFFFF77"
        />
        <MapView.Polyline
          coordinates={path}
          strokeWidth={5}
          strokeColor="#f4ce42"
        />
      </MapView>
    );
  }
}
