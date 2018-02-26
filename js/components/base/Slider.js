import React from 'react';
import {View, Slider as NativeSlider} from 'react-native';
import Text from './Text';
import {COLOR_HIGHLIGHT} from './constants';

const style = {
  container: {
    marginTop: 10,
    marginBottom: 15,
  },
  slider: {
    marginTop: 10,
  },
};

export default class Slider extends React.Component {
  render() {
    const {label, formatValue} = this.props;

    const sliderProps = {...this.props};
    delete sliderProps.label;
    delete sliderProps.formatValue;

    const displayValue = formatValue
      ? formatValue(this.props.value)
      : this.props.value;

    return (
      <View style={style.container}>
        <Text>
          {`${label}: ${displayValue}`}
        </Text>
        <NativeSlider
          {...sliderProps}
          thumbTintColor={COLOR_HIGHLIGHT}
          minimumTrackTintColor={COLOR_HIGHLIGHT}
          style={style.slider}
        />
      </View>
    );
  }
}
