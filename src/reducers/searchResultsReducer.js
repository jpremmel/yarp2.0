import constants from './../constants';
const { initialState } = constants;

const searchResultsReducer = (state = initialState.searchResults, action) => {
  switch (action.type) {
  case 'RECEIVE_SEARCH_RESULTS':
    return action.searchResults;
  case 'SEARCH_ERROR':
    return { 'ErrorMessage': 'Search unsuccessful. Please try again.' };
  case 'SIGNOUT_SUCCESS':
    return {};
  default:
    return state;
  }
};

export default searchResultsReducer;