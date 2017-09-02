import * as types from 'features/searchSuggestion/searchSuggestionActionTypes';

/* Reducers */
const initialState = {
  query: undefined,
  hidden: true,
  fetching: false,
  userIds: [],
  trackIds: [],
};

export function startSearchSuggestion(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function stopSearchSuggestion(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function updateUserResults(state, { userIds }) {
  return {
    ...state,
    userIds: [...userIds],
  };
}

export function updateTrackResults(state, { trackIds }) {
  return {
    ...state,
    trackIds: [...trackIds],
  };
}

export function hideSearchSuggestionResults(state) {
  return {
    ...state,
    hidden: true,
  };
}

export function showSearchSuggestionResults(state) {
  return {
    ...state,
    hidden: false,
  };
}

export function clearSearchSuggestionResults(state) {
  return {
    ...state,
    userIds: [],
    trackIds: [],
  };
}

export function updateSearchSuggestionQuery(state, { query }) {
  return {
    ...state,
    query,
  };
}

export default function searchSuggestionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_SUGGESTION_START:
      return startSearchSuggestion(state);

    case types.SEARCH_SUGGESTION_STOP:
      return stopSearchSuggestion(state);

    case types.SEARCH_SUGGESTION_FAIL:
      return stopSearchSuggestion(state);

    case types.SEARCH_SUGGESTION_USER_RESULTS_UPDATE:
      return updateUserResults(state, action.payload);

    case types.SEARCH_SUGGESTION_TRACK_RESULTS_UPDATE:
      return updateTrackResults(state, action.payload);

    case types.SEARCH_SUGGESTION_RESULTS_HIDE:
      return hideSearchSuggestionResults(state);

    case types.SEARCH_SUGGESTION_RESULTS_SHOW:
      return showSearchSuggestionResults(state);

    case types.SEARCH_SUGGESTION_RESULTS_CLEAR:
      return clearSearchSuggestionResults(state);

    case types.SEARCH_SUGGESTION_QUERY_UPDATE:
      return updateSearchSuggestionQuery(state, action.payload);

    default:
      return state;
  }
}
