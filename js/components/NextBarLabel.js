import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#DDD',
  },
  barName: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

export default class NextBarLabel extends React.Component {
  render() {
    const {name, distance, duration} = this.props;

    if (name && distance && duration) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {duration + ' to '}
            <Text style={styles.barName}>
              {name}
            </Text>
            {', ' + distance}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Find the next beer!
          </Text>
        </View>
      );
    }
  }
}
