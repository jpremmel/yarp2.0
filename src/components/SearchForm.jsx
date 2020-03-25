import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchSearchResults } from './../actions';

const SearchForm = ({ dispatch, myArticlesList, currentPaperId }) => {

  let myArticlesIds = [];
  if (myArticlesList) {
    Object.keys(myArticlesList).map(articleId => {
      myArticlesIds.push(articleId);
    });
  }

  let input = '';
  const btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  };
  return(
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(fetchSearchResults(input.value.trim(), myArticlesIds, currentPaperId));
        input.value = '';
      }}>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Search for an article'
            ref={node => { input = node; }} />
        </div>
        <button style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>search</i>Search</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  let myArticles = null;
  if (state.firebase.auth.uid) {
    const userId = state.firebase.auth.uid;
    myArticles = state.firestore.data[`${userId}::articles`];
  }
  return {
    myArticlesList: myArticles,
    currentPaperId: state.currentPaperId
  };
};

export default compose(
  connect(mapStateToProps)
)(SearchForm);