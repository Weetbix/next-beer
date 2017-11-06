import React from 'react';
import {connect} from 'react-redux';
import {Button, View} from 'react-native';

import NavMap from '../components/NavMap';
import NextBarLabel from '../components/NextBarLabel';

import * as RouteActions from '../actions/route';

const style = {
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
};

class App extends React.Component {
  componentDidMount() {
    // For testing purposes, generate a new route every 5 seconds
    setInterval(
      () => {
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
      },
      50000,
    );
  }

  render() {
    return (
      <View style={style.container}>
        <NavMap coords={this.props.route.points} />
        <View style={{padding: 10}}>
          <Button title="Go!" onPress={() => true} />
        </View>
        <NextBarLabel name="Laika" distance={300} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    genRoute: (from, to) => dispatch(RouteActions.fetchRoute(from, to)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
