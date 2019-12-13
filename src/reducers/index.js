import { combineReducers } from 'redux';
import searchResultsReducer from './searchResultsReducer';
import articleListReducer from './articleListReducer';
import selectArticleReducer from './selectArticleReducer';
// import { firebaseReducer } from 'react-redux-firebase'; //trying to figure out whether I need this
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  articles: articleListReducer,
  currentPaperId: selectArticleReducer,
  // firebase: firebaseReducer, //trying to figure out whether I need this
  firestore: firestoreReducer
});

export default rootReducer;