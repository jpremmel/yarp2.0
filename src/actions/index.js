import constants from './../constants';
const { firebaseConfig, types } = constants;
import * as firebase from 'firebase';

//added today:
// import 'firebase/firestore';
// import 'firebase/auth';

// firebase.initializeApp(firebaseConfig);
//initialize firestore:
// firebase.firestore()/*.settings({ timestampsInSnapshots: true })*/;


// const articles = firebase.database().ref('articles'); //SWITCHING TO FIRESTORE

export function fetchSearchResults(search) {
  return function (dispatch) {
    search = search.replace(' ', '_');
    return fetch(`https://core.ac.uk:443/api-v2/articles/search/${search}?page=1&pageSize=10&metadata=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${process.env.API_KEY}`).then(
      response => response.json(),
      error => console.log('Error occurred. ', error)
    ).then(function (json) {
      if (json.error) {
        console.log('Error code: ', json.error.code);
        console.log('Error message: ', json.error.message);
        dispatch(searchError());
      } else if (json.data.length > 0) {
        let searchResults = {};
        for (let i = 0; i < json.data.length; i++) {
          let newArticle = {
            coreId: json.data[i].id,
            author: json.data[i].authors[0],
            title: json.data[i].title,
            year: json.data[i].year,
            downloadUrl: json.data[i].downloadUrl,
            description: json.data[i].description
          };
          searchResults = Object.assign({}, searchResults, {
            [newArticle.coreId]: newArticle
          });
        }
        dispatch(receiveSearchResults(searchResults));
      } else {
        console.log('No search results.');
        dispatch(searchError());
      }
    }, error => {
      console.log('Error occurred. ', error);
      dispatch(searchError());
    });
  };
}

export const requestArticles = search => ({
  type: types.REQUEST_ARTICLES,
  search
});

export const receiveSearchResults = searchResults => ({
  type: types.RECEIVE_SEARCH_RESULTS,
  searchResults
});

export const selectArticle = selectedArticle => ({
  type: types.SELECT_ARTICLE,
  selectedArticle
});

export const addArticle = (_coreId, _author, _title, _year, _downloadUrl, _description) => {
  if (!_coreId) { _coreId = ''; }
  if (!_author) { _author = ''; }
  if (!_title) { _title = ''; }
  if (!_year) { _year = ''; }
  if (!_downloadUrl) { _downloadUrl = ''; }
  if (!_description) { _description = ''; }
  // return () => articles.push({
  //   coreId: _coreId,
  //   author: _author,
  //   title: _title,
  //   year: _year,
  //   downloadUrl: _downloadUrl,
  //   description: _description
  // });
  return (dispatch, /*getState,*/ { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore(); //gives us a reference to our firestore database
    firestore.collection('articles').add({
      coreId: _coreId,
      author: _author,
      title: _title,
      year: _year,
      downloadUrl: _downloadUrl,
      description: _description
    }).then(() => {
      dispatch({ type: types.CREATE_ARTICLE, coreId, author, title, year, downloadUrl, description });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: types.CREATE_ARTICLE_ERROR, err });
    })
  }
}

// export function watchFirebaseArticlesRef() { //will need to edit this to look for firestore, not 'articles'
//   return function(dispatch) {
//     articles.on('child_added', data => {
//       const newArticle = Object.assign({}, data.val(), {
//         id: data.key
//       });
//       dispatch(receiveArticleFromFirebase(newArticle));
//     });
//   }
// }

// export function receiveArticleFromFirebase(_article) {
//   return {
//     type: types.RECEIVE_ARTICLE_FROM_FIREBASE,
//     article: _article
//   };
// }

export function removeArticleFromFirebase(id) { //will need to edit this to look for firestore, not 'articles'
  return (dispatch) => {
    // articles.child(id).remove();
    dispatch(removeArticle(id));
  };
}

export const removeArticle = id => ({
  type: types.REMOVE_ARTICLE,
  id
});

export const searchError = () => ({
  type: types.SEARCH_ERROR
});