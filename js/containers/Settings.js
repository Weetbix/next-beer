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

import * as SettingsActions from '../actions/settings';

const style = {
  container: {
    backgroundColor: '#333',
    flex: 1,
    padding: 20,
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
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'red',
  },
};

class Settings extends React.Component {
  render() {
    const {
      minimumBarDistance,
      maximumBarDistance,
    } = this.props;

    return (
      <View style={style.container}>
        <Slider label="Minimum bar distance" value={minimumBarDistance} />
        <Slider label="Maximum bar distance" value={maximumBarDistance} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {settings} = state;
  return {
    minimumBarDistance: settings.minimumBarDistance,
    maximumBarDistance: settings.maximumBarDistance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMinimumBarDistance: metres =>
      dispatch(SettingsActions.setMinimumBarDistance(metres)),
    setMaximumBarDistance: metres =>
      dispatch(SettingsActions.setMaximumBarDistance(metres)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
