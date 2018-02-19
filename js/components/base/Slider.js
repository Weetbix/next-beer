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
    const {label} = this.props;

    const sliderProps = {...this.props};
    delete sliderProps.label;

    return (
      <View style={style.container}>
        <Text>
          {`${label}: ${this.props.value}`}
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
