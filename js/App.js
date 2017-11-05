import React from 'react';
import NavMap from './NavMap/NavMap';

export default class App extends React.Component {
  state = {
    center: {lat: 52.4685913, long: 13.4309139},
    directionsTo: {lat: 52.4685913, long: 13.4309139},
  };

  componentDidMount() {
    setInterval(
      () => {
        this.setState({
          center: {
            lat: this.state.center.lat + (Math.random() * 2 - 1) * 0.01,
            long: this.state.center.long + (Math.random() * 2 - 1) * 0.01,
          },
          directionsTo: {
            lat: this.state.center.lat + (Math.random() * 2 - 1) * 0.01,
            long: this.state.center.long + (Math.random() * 2 - 1) * 0.01,
          },
        });
      },
      5000,
    );
  }

  render() {
    return (
      <NavMap
        center={this.state.center}
        directionTo={this.state.directionsTo}
      />
    );
  }
}
