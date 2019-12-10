import constants from './../constants';
const { initialState, types, firebaseConfig } = constants;

const selectArticleReducer = (state = initialState.currentPaperId, action) => {
  switch (action.type) {
  case types.SELECT_ARTICLE:
    if (state === action.selectedArticle) {
      return null;
    } else {
      return action.selectedArticle;
    }
  default:
    return state;
  }
};

export default selectArticleReducer;