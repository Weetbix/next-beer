import React from 'react';
import {connect} from 'react-redux';
import {Button, View, Alert, Text, Platform, StatusBar} from 'react-native';

import * as Constants from '../constants';
import {COLOR_BACKGROUND} from '../components/base/constants';
import HeaderText from '../components/base/HeaderText';
import Slider from '../components/base/Slider';
import SwitchGroup from '../components/base/SwitchGroup';

import * as SettingsActions from '../actions/settings';
import {resetStore} from '../actions/reset';

const style = {
  container: {
    backgroundColor: COLOR_BACKGROUND,
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
};

function formatDistance(metres) {
  if (metres >= 1000) {
    return `${(metres / 1000).toFixed(1)} km`;
  }
  return `${metres} m`;
}

class Settings extends React.Component {
  render() {
    const DISTANCE_STEP = 100;
    const {
      minimumBarDistance,
      maximumBarDistance,
      filterBarTypes,
    } = this.props;

    return (
      <View style={style.container}>
        <Slider
          label="Minimum bar distance"
          value={minimumBarDistance}
          minimumValue={Constants.MIN_BAR_DISTANCE}
          maximumValue={maximumBarDistance}
          formatValue={formatDistance}
          step={DISTANCE_STEP}
          onValueChange={val => this.props.setMinimumBarDistance(val)}
        />
        <Slider
          label="Maximum bar distance"
          value={maximumBarDistance}
          minimumValue={minimumBarDistance}
          maximumValue={Constants.MAX_BAR_DISTANCE}
          formatValue={formatDistance}
          step={DISTANCE_STEP}
          onValueChange={val => this.props.setMaximumBarDistance(val)}
        />
        <SwitchGroup
          label="Exclude bars with these labels:"
          value={filterBarTypes}
          onValueChange={val => this.props.setFilteredBarTypes(val)}
        />
        <Button title="Reset App" onPress={() => this.props.resetStore()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {settings} = state;
  return {
    minimumBarDistance: settings.minimumBarDistance,
    maximumBarDistance: settings.maximumBarDistance,
    filterBarTypes: settings.filterBarTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMinimumBarDistance: metres =>
      dispatch(SettingsActions.setMinimumBarDistance(metres)),
    setMaximumBarDistance: metres =>
      dispatch(SettingsActions.setMaximumBarDistance(metres)),
    setFilteredBarTypes: filteredBars =>
      dispatch(SettingsActions.setFilteredBarTypes(filteredBars)),
    resetStore: () => dispatch(resetStore()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
