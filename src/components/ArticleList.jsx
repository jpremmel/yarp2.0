import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectArticle, removeArticleFromFirebase } from './../actions';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';

const ArticleList = ({ articleList, currentPaperId }) => {

  const firestore = useFirestore();
  useFirestoreConnect('articles');
  const myArticles = useSelector(state => state.firestore.data.articles);
  const dispatch = useDispatch();

  const removeArticle = useCallback(
    articleId => dispatch(removeArticleFromFirebase({ firestore }, articleId)),
    [firestore]
  );

  let greyTextStyle = {
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

  return(
    <div>
      <h3 style={centerTextStyle}>My Articles</h3><br/>
      {myArticles ? (
          Object.keys(myArticles).map(articleId => {
            let article = myArticles[articleId];
            console.log('ARTICLE: ', article);
            let articleInformation = '';
            if (articleId === currentPaperId) {
              articleInformation =
                <div style={detailsStyle}>
                  <p>{article.year}</p>
                  <p>{article.description}</p>
                  <a target="_blank" href={article.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
                  <button style={btnStyle} className='waves-effect waves-light btn-small' onClick={() => {removeArticle(articleId);}}>Remove from My Articles</button>
                </div>;
            }
            if (article) {
              return <li 
              key={articleId} 
              onClick={() => {dispatch(selectArticle(articleId));}}>
              <em>{article.title}</em> by {article.author}{articleInformation}</li>;
            } else {
              return null;
            }
          })
        ) : (
          <h4 style={greyTextStyle}>No articles yet...</h4>
        )
      }
    </div>
  );
};

ArticleList.propTypes = {
  articleList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentPaperId: state.currentPaperId
  };
};

export default compose(connect(mapStateToProps))(ArticleList);