import React from 'react';
import {connect} from 'react-redux';
import {Button, View, Alert} from 'react-native';
import {Location, Permissions} from 'expo';

import NavMap from '../components/NavMap';
import NextBarLabel from '../components/NextBarLabel';

import * as RouteActions from '../actions/route';
import {updateLocation} from '../actions/location';

const style = {
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
};

class App extends React.Component {
  async componentDidMount() {
    // Check for location permissions
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Location permissions must be granted');
      return;
    }

    // Setup a callback to update the user location
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 100,
      },
      result => {
        const {latitude, longitude} = result.coords;
        this.props.updateUserPosition({
          latitude,
          longitude,
        });
      },
    );
  }

  render() {
    return (
      <View style={style.container}>
        <NavMap coords={this.props.route.points} />
        <View style={{padding: 10}}>
          <Button
            title="Go!"
            onPress={() => this.props.navigateToNextBar(this.props.location)}
          />
        </View>
        <NextBarLabel
          name={this.props.route.name}
          distance={this.props.route.distance}
          duration={this.props.route.duration}
        />
      </View>
    );
  }

  generateRandomRoute() {
    const center = {lat: 52.4685913, long: 13.4309139};
    const from = {
      lat: center.lat + (Math.random() * 2 - 1) * 0.01,
      long: center.long + (Math.random() * 2 - 1) * 0.01,
    };
    const to = {
      lat: center.lat + (Math.random() * 2 - 1) * 0.01,
      long: center.long + (Math.random() * 2 - 1) * 0.01,
    };
    this.props.genRoute(from, to);
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
    location: state.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    genRoute: (from, to) => dispatch(RouteActions.fetchRoute(from, to)),
    updateUserPosition: position => dispatch(updateLocation(position)),
    navigateToNextBar: currentLocation =>
      dispatch(RouteActions.navigateToNextBar(currentLocation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
