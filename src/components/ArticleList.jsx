import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectArticle, removeArticleFromFirebase } from './../actions';
import { firestoreConnect, useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';

const ArticleList = ({ /*dispatch,*/ articleList, currentPaperId }) => {

  const firestore = useFirestore();
  useFirestoreConnect('articles');
  const myArticles = useSelector(state => state.firestore.ordered.articles);
  const dispatch = useDispatch();
  const removeArticle = useCallback(
    article => dispatch(removeArticleFromFirebase({ firestore }, article)),
    [firestore]
  );

  return (
    <div>
      {myArticles ? (
        myArticles.map((article, i) => (
          <div key={i}>
            <p><em>{article.title}</em></p>
          </div>
        ))
      ) : (
        <h2><em>Loading.....</em></h2>
      )}
    </div>
  );


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
  // return(
  //   <div>
  //     {header}
  //     {Object.keys(articleList).map(articleId => {
  //       let article = articleList[articleId];
  //       let articleInformation = '';
  //       if (article.id === currentPaperId) {
  //         articleInformation =
  //           <div style={detailsStyle}>
  //             <p>{article.year}</p>
  //             <p>{article.description}</p>
  //             <a target="_blank" href={article.downloadUrl}><button style={btnStyle} className='waves-effect waves-light btn-small'>See article</button></a>
  //             <button style={btnStyle} className='waves-effect waves-light btn-small' onClick={() => {dispatch(removeArticleFromFirebase(article.id));}}>Remove from My Articles</button>
  //           </div>;
  //       }
  //       return <li 
  //         key={articleId} 
  //         onClick={() => {dispatch(selectArticle(article.id));}}>
  //         <em>{article.title}</em> by {article.author}{articleInformation}</li>;
  //     })}
  //   </div>
  // );
};

ArticleList.propTypes = {
  articleList: PropTypes.object,
  /*dispatch: PropTypes.func*/
};

// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     articleList: state./*firestore.data.*/articles,
//     currentPaperId: state.currentPaperId
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     { collection: 'articles' }
//   ])
// )(ArticleList);
export default ArticleList;