import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider, compose } from 'react-redux';
import rootReducer from './reducers';
import middlewareLogger from './middleware/middleware-logger';
import thunkMiddleware from 'redux-thunk';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, /*getFirebase*/ } from 'react-redux-firebase';
import constants from './constants';
const { firebaseConfig, initialState } = constants;
import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/auth';

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = createStore(
    rootReducer, 
    // initialState, //need to pass in initialstate?
    // compose(
      applyMiddleware(middlewareLogger, thunkMiddleware.withExtraArgument({ /*getFirebase,*/ getFirestore }))
    // )
  );

const rrfProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('react-app-root')
);