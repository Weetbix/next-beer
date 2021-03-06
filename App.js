import React from 'react';

import {AppLoading} from 'expo';
import App from './js/containers/App';
import Settings from './js/containers/Settings';

import {Provider} from 'react-redux';
import configureStore from './js/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

import {StackNavigator} from 'react-navigation';

const Navigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      header: null,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2096f2',
      },
      headerTintColor: '#fff',
      title: 'Settings',
      headerTitleStyle: {
        // For some reason we need to set a width for the
        // title otherwise the text will be elpised "sett.." :(
        width: 150,
      },
    },
  },
});

export default () => {
  const {
    store,
    persistor,
  } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};
