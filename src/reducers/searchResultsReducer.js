import constants from './../constants';
const { initialState } = constants;

const searchResultsReducer = (state = initialState.searchResults, action) => {
  switch (action.type) {
  case 'SEARCHING':
    return { 'Status' : 'Fetching search results...' };
  case 'RECEIVE_SEARCH_RESULTS':
    return action.searchResults;
  case 'SEARCH_ERROR':
    return { 'ErrorMessage': 'Search unsuccessful.' };
  case 'SIGNOUT_SUCCESS':
    return {};
  case 'CLEAR_SEARCH_RESULTS':
    return {};
  default:
    return state;
  }
};

export default searchResultsReducer;