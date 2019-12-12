import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectArticle, removeArticleFromFirebase } from './../actions';

const ArticleList = ({ dispatch, articleList, currentPaperId }) => {
  let noArticlesStyle = {
    color: '#d9d9d9',
    textAlign: 'center'
  };
  let centerTextStyle = {
    textAlign: 'center'
  };
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
  let header;
  if (Object.entries(articleList).length != 0) {
    header = <div><h3 style={centerTextStyle}>My Articles</h3><br/></div>;
  } else {
    header = <h4 style={noArticlesStyle}>No articles yet</h4>;
  }
  return(
    <div>
      {header}
      {Object.keys(articleList).map(articleId => {
        let article = articleList[articleId];
        let articleInformation = '';
        if (article.id === currentPaperId) {
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
          onClick={() => {dispatch(selectArticle(article.id));}}>
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