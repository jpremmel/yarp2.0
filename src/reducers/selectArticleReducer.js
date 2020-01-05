import constants from './../constants';
const { initialState } = constants;

const selectArticleReducer = (state = initialState.currentPaperId, action) => {
  switch (action.type) {
  case 'SELECT_ARTICLE':
    if (state === action.selectedArticle) {
      return null;
    } else {
      return action.selectedArticle;
    }
  case 'REMOVE_ARTICLE':
    return null;
  default:
    return state;
  }
};

export default selectArticleReducer;