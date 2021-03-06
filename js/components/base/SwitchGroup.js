import React from 'react';
import {View} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import Switch from './Switch';
import Text from './Text';

const style = {
  container: {
    marginTop: 10,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switch: {
    width: '40%',
    marginLeft: '5%',
    marginRight: '5%',
  },
};

export default class SwitchGroup extends React.Component {
  onSwitchValueChange(id, value) {
    if (this.props.onValueChange) {
      const newValue = cloneDeep(this.props.value);
      newValue.find(item => item.id === id).value = value;

      this.props.onValueChange(newValue);
    }
  }

  render() {
    const {label, value = []} = this.props;

    const switches = value.map(item => (
      <Switch
        key={item.id}
        label={item.label}
        value={item.value}
        containerStyle={style.switch}
        onValueChange={value =>
          this.onSwitchValueChange.call(this, item.id, value)}
      />
    ));

    return (
      <View style={style.container}>
        <Text>
          {label}
        </Text>
        <View style={style.switchContainer}>
          {switches}
        </View>
      </View>
    );
  }
}
