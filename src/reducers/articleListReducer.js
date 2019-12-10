import constants from './../constants';
const { initialState, types, firebaseConfig } = constants;

const articleListReducer = (state = initialState.papersById, action) => {
  switch (action.type) {
    case types.RECEIVE_ARTICLE_FROM_FIREBASE:
      let newState = Object.assign({}, state);
      newState[action.article.id] = action.article;
      return newState;
    case types.SAVE_ARTICLE:
      return {...state,
      [action.article.coreId]: action.article}
    default:
      return state;
  }
};

export default articleListReducer;