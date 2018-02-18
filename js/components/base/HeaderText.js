import React from 'react';
import AppText from './Text';
import {Text} from 'react-native';

export default function HeaderText(props) {
  const style = {
    fontSize: 20,
    ...props.style,
  };
  return (
    <AppText>
      <Text style={style}>
        {props.children}
      </Text>
    </AppText>
  );
}
