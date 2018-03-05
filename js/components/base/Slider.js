import React from 'react';
import PropTypes from 'prop-types';
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

export default function Slider(props) {
  const {label, formatValue} = props;

  const sliderProps = {...props};
  delete sliderProps.label;
  delete sliderProps.formatValue;

  const displayValue = formatValue ? formatValue(props.value) : props.value;

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

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  formatValue: PropTypes.func,
};
