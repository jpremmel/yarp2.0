import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import indexReducers from './reducers';
import middlewareLogger from './middleware/middleware-logger';
import thunkMiddleware from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, firebaseReducer } from 'react-redux-firebase';
import constants from './constants';
const { firebaseConfig } = constants;
import firebase from 'firebase';
import 'firebase/firestore';
import createReduxStore from './createReduxStore';

const reactReduxFirebaseConfig = {  }; //need to figure out what goes in here

firebase.initializeApp(firebaseConfig);
firebase.firestore()

//Add Firebase to reducers
const rootReducer = combineReducers({
  indexReducer: indexReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default () => {
  return createStore(
    rootReducer, 
    compose(
      reactReduxFirebase(firebase, reactReduxFirebaseConfig),
      reduxFirestore(firebase),
      applyMiddleware(middlewareLogger, thunkMiddleware.withExtraArgument({getFirebase, getFirestore}))
    )
  );
}


const rrfProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('react-app-root')
);