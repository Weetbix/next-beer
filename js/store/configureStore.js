import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

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
//
//         isFetching : false
//         polyLine :
//         distance :
//         duration :
//         name : barname
//         destination : { coords }
//     }
//     previousBars : [
//         Bar,
//         Bar,
//     ]
// };

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
