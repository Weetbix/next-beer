import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  View,
  Alert,
  Text,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';

import HeaderText from '../components/base/HeaderText';
import Slider from '../components/base/Slider';

const style = {
  container: {
    backgroundColor: '#333',
    flex: 1,
    padding: 80,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 20,
  },
  text: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontStyle: 'bold',
  },
  setting: {
    // flex: 1
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'red',
  },
};

class Settings extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <HeaderText style={{fontWeight: 'bold'}}>
          Settings
        </HeaderText>

        <Slider />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // bar: state.bar.points,
    // location: state.location,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // updateUserPosition: position => dispatch(updateLocation(position)),
    // navigateToNextBar: currentLocation =>
    //   dispatch(BarActions.navigateToNextBar(currentLocation)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
