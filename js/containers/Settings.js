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
    const PRICE_STEP = 1;
    const RATING_STEP = 0.1;
    const DISTANCE_TO_SKIP_STEP = 2;

    const {
      minimumBarPrice,
      maximumBarPrice,
      minimumBarRating,
      maximumBarRating,
      distanceToSkip,
      filterBarTypes,
    } = this.props;

    return (
      <View style={style.container}>
        <Slider
          label="Distance from bar to be able to skip"
          value={distanceToSkip}
          minimumValue={Constants.MIN_DISTANCE_TO_SKIP}
          maximumValue={Constants.MAX_DISTANCE_TO_SKIP}
          step={DISTANCE_TO_SKIP_STEP}
          formatValue={formatDistance}
          onValueChange={val => this.props.setDistanceToSkip(val)}
        />
        <Slider
          label="Minimum bar price"
          value={minimumBarPrice}
          minimumValue={Constants.MIN_BAR_PRICE}
          maximumValue={maximumBarPrice}
          step={PRICE_STEP}
          onValueChange={val => this.props.setMinimumBarPrice(val)}
        />
        <Slider
          label="Maximum bar price"
          value={maximumBarPrice}
          minimumValue={minimumBarPrice}
          maximumValue={Constants.MAX_BAR_PRICE}
          step={PRICE_STEP}
          onValueChange={val => this.props.setMaximumBarPrice(val)}
        />
        <Slider
          label="Minimum bar rating"
          value={minimumBarRating}
          minimumValue={Constants.MIN_BAR_RATING}
          maximumValue={maximumBarRating}
          step={RATING_STEP}
          onValueChange={val => this.props.setMinimumBarRating(val)}
        />
        <Slider
          label="Maximum bar rating"
          value={maximumBarRating}
          minimumValue={minimumBarRating}
          maximumValue={Constants.MAX_BAR_RATING}
          step={RATING_STEP}
          onValueChange={val => this.props.setMaximumBarRating(val)}
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
    minimumBarRating: settings.minimumBarRating,
    maximumBarRating: settings.maximumBarRating,
    minimumBarPrice: settings.minimumBarPrice,
    maximumBarPrice: settings.maximumBarPrice,
    distanceToSkip: settings.distanceToSkip,
    filterBarTypes: settings.filterBarTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMinimumBarRating: rating =>
      dispatch(SettingsActions.setMinimumBarRating(rating)),
    setMaximumBarRating: rating =>
      dispatch(SettingsActions.setMaximumBarRating(rating)),
    setMinimumBarPrice: price =>
      dispatch(SettingsActions.setMinimumBarPrice(price)),
    setMaximumBarPrice: price =>
      dispatch(SettingsActions.setMaximumBarPrice(price)),
    setDistanceToSkip: distance =>
      dispatch(SettingsActions.setDistanceToSkip(distance)),
    setFilteredBarTypes: filteredBars =>
      dispatch(SettingsActions.setFilteredBarTypes(filteredBars)),
    resetStore: () => dispatch(resetStore()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
