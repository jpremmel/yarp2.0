import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticle, removeArticleFromFirebase } from './../actions';

const ArticleList = ({ dispatch, articleList, currentPaperId }) => {
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
      <h3>My Articles</h3>
      <br/>
      {Object.keys(articleList).map(articleId => {
        let article = articleList[articleId];
        let articleInformation = '';
        if (article.coreId === currentPaperId) {
          articleInformation =
            <div style={detailsStyle}>
              <p>{article.year}</p>
              <p>{article.description}</p>
              <a target="_blank" href={article.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
              <button style={btnStyle} className='waves-effect waves-light btn-small' onClick={() => {dispatch(removeArticleFromFirebase(article.id))}}>Remove from My Articles</button>
            </div>;
        }
        return <li 
          key={articleId} 
          onClick={() => {dispatch(selectArticle(article.coreId));}}>
          <em>{article.title}</em> by {article.author}{articleInformation}</li>;
      })}
    </div>
  );
};

ArticleList.propTypes = {
  articleList: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    articleList: state.papersById,
    currentPaperId: state.currentPaperId
  };
};

export default connect(mapStateToProps)(ArticleList);