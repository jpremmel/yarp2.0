import constants from './../constants';
const { initialState, types } = constants;

const articleListReducer = (state = initialState.articles, action) => {
  let newState;
  switch (action.type) {
    case types.RECEIVE_ARTICLE_FROM_FIREBASE:
      newState = Object.assign({}, state);
      newState[action.article.id] = action.article;
      return newState;
    case types.REMOVE_ARTICLE:
      newState = {...state};
      delete newState[action.id];
      return newState;
    case types.SAVE_ARTICLE: //not sure what to do here
      console.log('Saving article', action.article);
      return state;
    case types.SAVE_ARTICLE_ERROR:
      console.log('Save article error', action.err); //added this today
      return state;
    default:
      return state;
  }
};

export default articleListReducer;