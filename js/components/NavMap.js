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

const PATH_PROPTYPE = PropTypes.arrayOf(COORDINATE_PROPTYPE);

export default class NavMap extends React.Component {
  static propTypes = {
    // The initial center for the map, this will only be
    // used on initial display of the map
    initialCenter: COORDINATE_PROPTYPE.isRequired,

    // An array of long/lat points which will be drawn on the map
    currentPath: PATH_PROPTYPE.isRequired,
    previousPaths: PropTypes.arrayOf(PATH_PROPTYPE),

    // The cooridnates of the destination
    destination: COORDINATE_PROPTYPE,
  };

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(this.props.currentPath, nextProps.currentPath) &&
      nextProps.currentPath &&
      nextProps.currentPath.length > 0
    ) {
      // fit to new path
      this.mapView.fitToCoordinates(nextProps.currentPath, {
        edgePadding: MAP_EDGE_PADDING,
        animated: true,
      });
    }
  }

  render() {
    const {
      initialCenter,
      currentPath,
      previousPaths,
      destination,
    } = this.props;

    const initialRegion = {
      ...initialCenter,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    // Create a path which joins the last point to the
    // actual destination point
    const path = currentPath.length > 0 ? [...currentPath, destination] : [];

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
        {previousPaths.map(path => (
          <MapView.Polyline
            key={String(path[0].longitude) + String(path[0].latitude)}
            coordinates={path}
            strokeWidth={8}
            strokeColor="#99999977"
          />
        ))}
        {currentPath.length > 0 &&
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
