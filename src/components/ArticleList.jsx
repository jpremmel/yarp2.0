import React, { useState, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectArticle, removeArticleFromFirebase } from './../actions';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';

const ArticleList = (props) => {

  const firestore = useFirestore();
  const userId = props.auth.uid;
  useFirestoreConnect([
    {
      collection: 'users',
      doc: userId,
      subcollections: [{collection: 'articles'}],
      storeAs: userId + '::articles'
    }
  ]);
  const myArticles = useSelector(state => state.firestore.data[`${userId}::articles`]);
  const dispatch = useDispatch();

  const removeArticle = useCallback(
    articleId => dispatch(removeArticleFromFirebase({ firestore }, articleId)),
    [firestore]
  );

  const greyTextStyle = {
    color: '#d9d9d9',
    textAlign: 'center'
  };
  const centerTextStyle = {
    textAlign: 'center'
  };
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

  if (props.auth.uid) {
    return(
      <div>
        <h3 style={centerTextStyle}>My Articles</h3>
        <p style={centerTextStyle}>Currently signed in: {props.auth.email}</p>
        <br/>
        {myArticles ? (
            Object.keys(myArticles).map(articleId => {
              let article = myArticles[articleId];
              let articleInformation = '';
              if (articleId === props.currentPaperId) {
                articleInformation =
                  <div style={detailsStyle}>
                    <p>{article.year}</p>
                    <p>{article.description}</p>
                    <a target="_blank" href={article.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
                    <button style={btnStyle} className='waves-effect waves-light btn-small' onClick={() => {removeArticle(articleId);}}>Remove from My Articles</button>
                  </div>;
              }
              let authorName = '';
              if (article.author) {
                authorName = ` by ${article.author}`;
              }
              if (article) {
                return <span key={articleId}>
                  <li onClick={() => {dispatch(selectArticle(articleId));}}>
                    <em>{article.title}</em>{authorName}
                  </li>{articleInformation}
                </span>;
              } else {
                return null;
              }
            })
          ) : (
            <h4 style={greyTextStyle}>No articles yet</h4>
          )
        }
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    currentPaperId: state.currentPaperId,
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(ArticleList);