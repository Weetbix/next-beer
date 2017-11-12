import React from 'react';
import {MapView} from 'expo';
import DarkTheme from './NavMap.DarkTheme';

export default class NavMap extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.coords) !== JSON.stringify(nextProps.coords)
    ) {
      // fit to new coords
      this.mapView.fitToCoordinates(nextProps.coords, {
        edgePadding: {
          top: 100,
          right: 100,
          bottom: 100,
          left: 100,
        },
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
        showsUserLocation={true}
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
