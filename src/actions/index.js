export function fetchSearchResults(search, myArticlesCoreIds, currentPaperId) {
  return function (dispatch) {
    if (!myArticlesCoreIds.includes(currentPaperId)) {
      dispatch({ type: 'REMOVE_ARTICLE' });
    }
    dispatch({ type: 'SEARCHING' });
    search = search.replace(' ', '_');
    return fetch(`https://core.ac.uk:443/api-v2/articles/search/${search}?page=1&pageSize=100&metadata=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${process.env.API_KEY}`).then(
      response => response.json(),
      error => dispatch({ type: 'SEARCH_ERROR' })
    ).then(function (json) {
      if (json && json.error) {
        console.log('Error code: ', json.error.code);
        console.log('Error message: ', json.error.message);
        dispatch({ type: 'SEARCH_ERROR' });
      } else if (json && json.data && json.data.length > 0) {
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
        dispatch({ type: 'RECEIVE_SEARCH_RESULTS', searchResults });
      } else {
        console.log('No search results.');
        dispatch({ type: 'SEARCH_ERROR' });
      }
    }, error => {
      console.log('Error occurred. ', error);
      dispatch({ type: 'SEARCH_ERROR' });
    });
  };
}

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS'
});

export const selectArticle = selectedArticle => ({
  type: 'SELECT_ARTICLE',
  selectedArticle
});

export const saveArticle = ({ firestore }, article) => {
  if (!article.coreId) { article.coreId = ''; }
  if (!article.author) { article.author = ''; }
  if (!article.title) { article.title = ''; }
  if (!article.year) { article.year = ''; }
  if (!article.downloadUrl) { article.downloadUrl = ''; }
  if (!article.description) { article.description = ''; }
  return (dispatch, getState) => {
    const userId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(userId)
      .collection('articles')
      .add(article)
      .then(() => {
        dispatch({ type: 'SAVE_ARTICLE', article });
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch({ type: 'SAVE_ARTICLE_ERROR', err });
      });
  };
};

export const removeArticleFromFirebase = ({ firestore }, id) => {
  return (dispatch, getState) => {
    const userId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(userId)
      .collection('articles')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'REMOVE_ARTICLE', id });
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };
};