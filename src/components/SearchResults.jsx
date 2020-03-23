import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { selectArticle, saveArticle } from './../actions';
import { useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';

const SearchResults = ({ myArticlesList, searchResults, currentPaperId, auth}) => {
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const saveToMyArticles = useCallback(
    article => dispatch(saveArticle({ firestore }, article)),
    [firestore]
  );

  let myArticlesCoreIds = [];
  if (myArticlesList) {
    Object.keys(myArticlesList).map(articleInMyList => {
      if (myArticlesList[articleInMyList]) {
        myArticlesCoreIds.push(myArticlesList[articleInMyList].coreId);
      }
    });
  }

  const listView = {
    marginBottom: '10px'
  };
  const detailsStyle = {
    backgroundColor: '#f2f2f2',
    borderRadius: '3px',
    padding: '15px'
  };
  const btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  };
  const centerTextStyle = {
    textAlign: 'center'
  };
  const preloaderStyle = {
    width: '70%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '70px'
  };
  const titleHover = `
  .title:hover {
    color: #26a69a;
  }
  `;
  const searchError = {
    color: '#d9d9d9',
    textAlign: 'center'
  };

  let searchHeader = '';
  if (Object.entries(searchResults).length != 0){
    searchHeader = <div><h4 style={centerTextStyle}>Search Results</h4><br/></div>;
  }
  
  if (searchResults.Status === 'Fetching search results...') {
    return(
      <div className="progress" style={preloaderStyle}>
        <div className="indeterminate">
        </div>
      </div>);
  } else if (searchResults.ErrorMessage) {
    return(
      <div>
        <h5 style={searchError}>{searchResults.ErrorMessage}</h5>
      </div>
    );
  } else {
    return(
      <div>
        <style>{titleHover}</style>
        {searchHeader}
        {Object.keys(searchResults).map(resultId => {
          let result = searchResults[resultId];
          let saveToMyArticlesButton;
          if (auth.uid) {
            if (myArticlesCoreIds.includes(result.coreId)) {
              saveToMyArticlesButton = <button className='waves-effect waves-light btn-small'
                style={btnStyle}
                disabled={true}>
                  <i className='material-icons left'>done</i>
                  Added To My Articles
              </button>;
            } else {
              saveToMyArticlesButton = <button className='waves-effect waves-light btn-small'
                style={btnStyle}
                onClick={() => {saveToMyArticles(result);}}>
                  <i className='material-icons left'>add</i>
                  Add To My Articles
              </button>;
            }
          }
          let resultInformation = '';
          if (result.coreId === currentPaperId) {
            resultInformation =
              <div style={detailsStyle}>
                <p>{result.year}</p>
                <p>{result.description}</p>
                <a target='_blank' href={result.downloadUrl}>
                  <button style={btnStyle} className='waves-effect waves-light btn-small'>
                    <i className='material-icons left'>launch</i>
                    See article
                  </button>
                </a>
                {saveToMyArticlesButton}
              </div>;
          }
          let authorName = '';
          if (result.author) {
            authorName = ` by ${result.author}`;
          }
          return <div key={resultId} style={listView}>
            <div className='title' onClick={() => {dispatch(selectArticle(result.coreId));}}>
              <b>{result.title}</b>{authorName}
            </div>{resultInformation}
          </div>;
        })}
      </div>
    );
  }  
};

SearchResults.propTypes = {
  searchResults: PropTypes.object
};

const mapStateToProps = (state) => {
  let results = null;
  let myArticles = null;
  if (state.searchResults != null) {
    results = state.searchResults;
  }
  if (state.firebase.auth.uid) {
    const userId = state.firebase.auth.uid;
    myArticles = state.firestore.data[`${userId}::articles`];
  }
  return {
    myArticlesList: myArticles,
    searchResults: results,
    currentPaperId: state.currentPaperId,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps)
)(SearchResults);