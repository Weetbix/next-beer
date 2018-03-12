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

class Settings extends React.Component {
  render() {
    const PRICE_STEP = 1;
    const RATING_STEP = 0.1;

    const {
      minimumBarPrice,
      maximumBarPrice,
      minimumBarRating,
      maximumBarRating,
      filterBarTypes,
    } = this.props;

    return (
      <View style={style.container}>
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
    setFilteredBarTypes: filteredBars =>
      dispatch(SettingsActions.setFilteredBarTypes(filteredBars)),
    resetStore: () => dispatch(resetStore()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
