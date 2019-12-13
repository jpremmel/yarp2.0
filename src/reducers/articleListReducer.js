import constants from './../constants';
const { initialState, types } = constants;

const articleListReducer = (state = initialState.papersById, action) => {
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
    case types.CREATE_ARTICLE:
      //not sure what to do here
      return state;
    case types.CREATE_ARTICLE_ERROR:
      console.log('create article error ', action.err); //added this today
      return state;
    default:
      return state;
  }
};

export default articleListReducer;