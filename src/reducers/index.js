import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsReducer';
import selectArticleReducer from './selectArticleReducer';
import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  currentPaperId: selectArticleReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;