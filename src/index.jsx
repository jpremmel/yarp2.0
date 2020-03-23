import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import rootReducer from './reducers';
import middlewareLogger from './middleware/middleware-logger';
import thunkMiddleware from 'redux-thunk';
import { getFirestore, createFirestoreInstance, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import constants from './constants';
const { firebaseConfig } = constants;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(middlewareLogger, thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase) //need this line to get access to firestore via getFirestore function
  )
);

const rrfProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) {
    return <div>Loading...</div>;
  } else {
    return children;
  }
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <HashRouter>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </HashRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('react-app-root')
);