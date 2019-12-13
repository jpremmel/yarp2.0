import constants from './../constants';
const { initialState, types } = constants;

const searchResultsReducer = (state = initialState.searchResults, action) => {
  switch (action.type) {
  case types.RECEIVE_SEARCH_RESULTS:
    return action.searchResults;
  case types.SEARCH_ERROR:
    return { 'ErrorMessage': 'Search unsuccessful. Please try again.' };
  default:
    return state;
  }
};

export default searchResultsReducer;