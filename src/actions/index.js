import constants from './../constants';
const { types } = constants;
import firebase from 'firebase/app';
import 'firebase/firestore'; //trying to figure out whether I need this
import React, { useState, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

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

export const saveArticle = ({ firestore }, article) => {
  if (!article.coreId) { article.coreId = ''; }
  if (!article.author) { article.author = ''; }
  if (!article.title) { article.title = ''; }
  if (!article.year) { article.year = ''; }
  if (!article.downloadUrl) { article.downloadUrl = ''; }
  if (!article.description) { article.description = ''; }
  return (dispatch) => {
    firestore
      .collection('articles')
      .add(article)
      .then(() => {
        console.log('Adding article to firestore: ', article);
        dispatch({ type: types.SAVE_ARTICLE, article});
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch({ type: types.SAVE_ARTICLE_ERROR, err });
      })

    // //make async call to database
    // const firestore = getFirestore(); //gives us a reference to our firestore database
    // firestore.collection('articles').add({
    //   ...article
    // }).then(() => {
    //   dispatch({ type: types.SAVE_ARTICLE, article });
    // }).catch((err) => {
    //   console.log(err);
    //   dispatch({ type: types.SAVE_ARTICLE_ERROR, err });
    // })

  }
}

// export function watchFirebaseArticlesRef() {
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

export function removeArticleFromFirebase(id) {
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