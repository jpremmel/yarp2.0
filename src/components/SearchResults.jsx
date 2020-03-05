import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectArticle, saveArticle } from './../actions';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';

const SearchResults = ({ searchResults, currentPaperId, auth}) => {
  const firestore = useFirestore();
  useFirestoreConnect('articles');
  const dispatch = useDispatch();

  const saveToMyArticles = useCallback(
    article => dispatch(saveArticle({ firestore }, article)),
    [firestore]
  );

  const detailsStyle = {
    backgroundColor: '#d9d9d9',
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
  const searchError = {
    color: '#d9d9d9',
    textAlign: 'center'
  };
  let searchHeader = '';
  if (Object.entries(searchResults).length != 0){
    searchHeader = <div><h3 style={centerTextStyle}>Search Results</h3><br/></div>;
  }
  if (searchResults.ErrorMessage) {
    return(
      <div>
        <h5 style={searchError}>{searchResults.ErrorMessage}</h5>
      </div>
    );
  } else {
    return(
      <div>
        {searchHeader}
        {Object.keys(searchResults).map(resultId => {
          let result = searchResults[resultId];
          let saveToMyArticlesButton;
          if (auth.uid) {
            saveToMyArticlesButton = <button className='waves-effect waves-light btn-small'
            style={btnStyle}
            onClick={() => {saveToMyArticles(result);}}>Add To My Articles</button>;
          }
          let resultInformation = '';
          if (result.coreId === currentPaperId) {
            resultInformation =
              <div style={detailsStyle}>
                <p>{result.year}</p>
                <p>{result.description}</p>
                <a target='_blank' href={result.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
                {saveToMyArticlesButton}
              </div>;
          }
          return <li 
            key={resultId} 
            onClick={() => {dispatch(selectArticle(result.coreId));}}>
            <em>{result.title}</em> by {result.author}{resultInformation}</li>;
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
  if (state.searchResults != null) {
    results = state.searchResults;
  }
  return {
    searchResults: results,
    currentPaperId: state.currentPaperId,
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(SearchResults);