import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  View,
  Alert,
  DrawerLayoutAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import {Location, Permissions, AppLoading} from 'expo';

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
    const {location, bar} = this.props;

    // Hang on the app loading page until we fetch the location
    if (location === null) {
      return <AppLoading />;
    }

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
            coords={bar.points}
            destination={bar.location}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{padding: 10}}>
              <Button title="..." />
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
                onPress={() => this.props.navigateToNextBar(location)}
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
    location: state.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserPosition: position => dispatch(updateLocation(position)),
    navigateToNextBar: currentLocation =>
      dispatch(BarActions.navigateToNextBar(currentLocation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
