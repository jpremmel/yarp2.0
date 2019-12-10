import constants from './../constants';
const { initialState, types, firebaseConfig } = constants;

const articleListReducer = (state = initialState.papersById, action) => {
  switch (action.type) {
    case types.SAVE_ARTICLE:
      console.log(state);
      return {...state,
      [action.article.coreId]: action.article}
    default:
      return state;
  }
};

export default articleListReducer;