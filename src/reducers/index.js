import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsReducer';
import selectArticleReducer from './selectArticleReducer';
import authErrorReducer from './authErrorReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  currentPaperId: selectArticleReducer,
  authError: authErrorReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;