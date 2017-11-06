import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

// store = {
//     bar :
//     {
//         location : {}
//         name :
//         id
//     },
//     location :
//     {
// latitude :
// longitute :
//     }
//     route : {
//         isFetching : false
//         polyLine :
//         start :
//         end :
//     }
//     previousBars : [
//         Bar,
//         Bar,
//     ]
// };

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
