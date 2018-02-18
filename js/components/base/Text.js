import React from 'react';
import {Text} from 'react-native';

export default function AppText(props) {
  const style = {
    ...props.style,
    color: '#DDD',
  };
  return (
    <Text style={style}>
      {props.children}
    </Text>
  );
}
