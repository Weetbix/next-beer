import React from 'react';
import {View, Switch as NativeSwitch} from 'react-native';
import {
  COLOR_HIGHLIGHT,
  COLOR_HIGHLIGHT_DARK,
  COLOR_HIGHLIGHT_LIGHT,
} from './constants';
import Text from './Text';

const style = {
  container: {
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  switch: {
    onTintColor: COLOR_HIGHLIGHT_LIGHT,
    tintColor: COLOR_HIGHLIGHT_DARK,
    thumbTintColor: COLOR_HIGHLIGHT,
  },
};

export default class Switch extends React.Component {
  render() {
    const {label} = this.props;

    const switchProps = {...this.props};
    delete switchProps.label;

    return (
      <View style={style.container}>
        <Text>
          {label}
        </Text>
        <NativeSwitch
          tintColor={style.switch.tintColor}
          thumbTintColor={style.switch.thumbTintColor}
          onTintColor={style.switch.onTintColor}
          {...switchProps}
        />
      </View>
    );
  }
}
