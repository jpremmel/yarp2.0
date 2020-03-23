import React, { useCallback } from 'react';
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
  const titleHover = `
  .title:hover {
    color: #26a69a;
  }
  `;

  if (props.auth.uid) {
    return(
      <div>
        <style>{titleHover}</style>
        <h4 style={centerTextStyle}>My Articles</h4>
        <p style={centerTextStyle}>Currently signed in: {props.auth.email}</p>
        <br/>
        {myArticles ? (
            Object.keys(myArticles).map(articleId => {
              if (myArticles[articleId]) {
                let article = myArticles[articleId];
                let articleAuthor = '';
                if (article.author) {
                  articleAuthor = ` by ${article.author}`;
                }
                let articleDetails = '';
                if (articleId === props.currentPaperId) {
                  articleDetails =
                    <div style={detailsStyle}>
                      <p>{article.year}</p>   
                      <p>{article.description}</p>
                      <a target="_blank" href={article.downloadUrl}>
                        <button style={btnStyle} className='waves-effect waves-light btn-small'>
                          <i className='material-icons left'>launch</i>
                          See article
                        </button>
                      </a>
                      <button style={btnStyle} className='waves-effect waves-light btn-small' onClick={() => {removeArticle(articleId);}}>
                      <i className='material-icons left'>remove</i>
                        Remove from My Articles
                      </button>
                    </div>;
                }
                return <div key={articleId} style={listView}>
                  <div className='title' onClick={() => {dispatch(selectArticle(articleId));}}>
                    <b>{article.title}</b>{articleAuthor}
                  </div>{articleDetails}
                </div>;
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

export default compose(
  connect(mapStateToProps)
)(ArticleList);