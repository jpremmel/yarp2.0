import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticle, addArticle } from './../actions';

const ArticleList = ({ dispatch, searchResults, currentPaperId }) => {
  let searchHeader = '';
  if (Object.entries(searchResults).length != 0){
    searchHeader = <div><h3>Search Results</h3><br/></div>;
  } 
  let detailsStyle = {
    backgroundColor: '#d9d9d9',
    borderRadius: '3px',
    padding: '15px'
  };
  let btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  };
  return(
    <div>
      {searchHeader}
      {Object.keys(searchResults).map(resultId => {
        let result = searchResults[resultId];
        let resultInformation = '';
        if (result.coreId === currentPaperId) {
          resultInformation =
            <div style={detailsStyle}>
              <p>{result.year}</p>
              <p>{result.description}</p>
              <a target='_blank' href={result.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
              <button className='waves-effect waves-light btn-small'
                style={btnStyle}
                onClick={() => {dispatch(addArticle(
                  result.coreId, 
                  result.author, 
                  result.title, 
                  result.year, 
                  result.downloadUrl, 
                  result.description
                ))}}>Add To My Articles</button>
            </div>;
        }
        return <li 
          key={resultId} 
          onClick={() => {dispatch(selectArticle(result.coreId));}}>
          <em>{result.title}</em> by {result.author}{resultInformation}</li>;
      })}
    </div>
  );
};

ArticleList.propTypes = {
  searchResults: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  let results = null;
  if (state.searchResults != null) {
    results = state.searchResults;
  }
  return {
    searchResults: results,
    currentPaperId: state.currentPaperId
  };
};

export default connect(mapStateToProps)(ArticleList);