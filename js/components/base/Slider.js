import React from 'react';
import {View, Slider as NativeSlider} from 'react-native';
import Text from './Text';

const style = {
  container: {
    marginTop: 10,
    marginBottom: 10,
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
          thumbTintColor={'#2096f2'}
          minimumTrackTintColor={'#2096f2'}
        />
      </View>
    );
  }
}
