import App from './js/containers/App';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './js/store/configureStore';

export default () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
