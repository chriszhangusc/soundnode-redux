import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from '@soundnode-redux/client/src/features/searchSuggestion/searchSuggestionActionTypes';

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

export default createReducer(initialState, {
  [types.SEARCH_SUGGESTION_START]: startSearchSuggestion,
  [types.SEARCH_SUGGESTION_STOP]: stopSearchSuggestion,
  [types.SEARCH_SUGGESTION_FAIL]: stopSearchSuggestion,
  [types.SEARCH_SUGGESTION_USER_RESULTS_UPDATE]: updateUserResults,
  [types.SEARCH_SUGGESTION_TRACK_RESULTS_UPDATE]: updateTrackResults,
  [types.SEARCH_SUGGESTION_RESULTS_HIDE]: hideSearchSuggestionResults,
  [types.SEARCH_SUGGESTION_RESULTS_SHOW]: showSearchSuggestionResults,
  [types.SEARCH_SUGGESTION_RESULTS_CLEAR]: clearSearchSuggestionResults,
  [types.SEARCH_SUGGESTION_QUERY_UPDATE]: updateSearchSuggestionQuery,
});
