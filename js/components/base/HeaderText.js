import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import AppText from './Text';

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

HeaderText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};
