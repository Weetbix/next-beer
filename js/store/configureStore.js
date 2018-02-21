import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root', // Name of the key to store as with AsyncStorage
  storage,
  // Merge the persisted state 2 levels deep. This means if we
  // load old persisted data into a new version of the app
  // any extra default keys added to the state will still exist
  // after rehydration, instead of being blatted over.
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
  const persistor = persistStore(store);

  return {store, persistor};
}
