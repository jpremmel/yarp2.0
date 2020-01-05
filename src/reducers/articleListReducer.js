import constants from './../constants';
const { initialState } = constants;

const articleListReducer = (state = initialState.articles, action) => {
  let newState;
  switch (action.type) {
    case 'RECEIVE_ARTICLE_FROM_FIREBASE':
      newState = Object.assign({}, state);
      newState[action.article.id] = action.article;
      return newState;
    case 'REMOVE_ARTICLE':
      newState = {...state};
      delete newState[action.id];
      return newState;
    case 'SAVE_ARTICLE':
      console.log('Saving article', action.article);
      return state;
    case 'SAVE_ARTICLE_ERROR':
      console.log('Save article error', action.err);
      return state;
    default:
      return state;
  }
};

export default articleListReducer;