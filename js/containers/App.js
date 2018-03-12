import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  View,
  Alert,
  DrawerLayoutAndroid,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Location, Permissions, AppLoading} from 'expo';
import {Ionicons} from '@expo/vector-icons';

import Settings from './Settings';
import NavMap from '../components/NavMap';
import NextBarLabel from '../components/NextBarLabel';

import * as BarActions from '../actions/bar';
import {updateLocation} from '../actions/location';

const style = {
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
};

class App extends React.Component {
  // Takes the result of an expo location update
  // and fires the update user position event
  handleLocationEvent(result) {
    const {latitude, longitude} = result.coords;
    this.props.updateUserPosition({
      latitude,
      longitude,
    });
  }

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
        timeInterval: 3000,
        distanceInterval: 10,
      },
      result => this.handleLocationEvent(result),
    );
  }

  componentWillReceiveProps(nextProps) {
    // If the location has been erased (by resetting the app)
    // we should fetch a new location now.
    // Note: This may not be the ideal way to handle this. It may
    // be better to handle reset in every reducer and choose not
    // to reset the location.
    if (nextProps.location === null) {
      Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        // On android, allow 20 second old locations
        maximumAge: 1000 * 20,
      }).then(result => this.handleLocationEvent(result));
    }
  }

  render() {
    const {location, bar, barHistory, settings} = this.props;

    // Hang on the app loading page until we fetch the location
    if (location === null) {
      // Note, this isn't ideal, as the AppLoading component only
      // works nicely if its the FIRST component rendered. However
      // when we reset the state, this will be shown again, resulting
      // in a white screen. Update to use our own loading screen or some
      // jazz here instead.
      return <AppLoading />;
    }

    const previousPaths = barHistory.map(previousBar => previousBar.points);

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerLockMode="locked-open"
        renderNavigationView={() => <Settings />}
      >
        <View style={style.container}>
          <NavMap
            initialCenter={location}
            currentPath={bar.points}
            previousPaths={previousPaths}
            destination={bar.location}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Settings')}
              >
                <Ionicons name="md-settings" size={35} color="#DDD" />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <NextBarLabel
                name={bar.name}
                distance={bar.distance}
                duration={bar.duration}
              />
            </View>
            <View style={{padding: 10}}>
              <Button
                title="Go!"
                disabled={this.props.bar.isFetching}
                onPress={() => this.props.navigateToNextBar()}
              />
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

function mapStateToProps(state) {
  return {
    bar: state.bar,
    barHistory: state.barHistory,
    location: state.location,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserPosition: position => dispatch(updateLocation(position)),
    navigateToNextBar: () => dispatch(BarActions.navigateToNextBar()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
