import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
