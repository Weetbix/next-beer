import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default class NextBarLabel extends React.Component {
  render() {
    const {name, distance} = this.props;

    const text = name && distance
      ? `${name} (${distance}m)`
      : 'Find the next beer!';

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }
}
