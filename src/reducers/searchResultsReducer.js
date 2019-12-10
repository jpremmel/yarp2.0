import constants from './../constants';
const { initialState, types, firebaseConfig } = constants;

const searchResultsReducer = (state = initialState.searchResults, action) => {
  switch (action.type) {
  case types.RECEIVE_SEARCH_RESULTS:
    return action.searchResults;
  default:
    return state;
  }
};

export default searchResultsReducer;