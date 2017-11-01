import { createReducer } from 'common/utils/reducerUtils';
import { mergeArrays } from 'common/utils/generalUtils';
import * as types from './searchActionTypes';

/* Reducers */
const initialState = {
  searchType: undefined,
  searchKey: undefined,
  searching: false,
  trackIds: [],
};

export function startSearching(state) {
  return {
    ...state,
    searching: true,
  };
}

export function stopSearching(state) {
  return {
    ...state,
    searching: false,
  };
}

export function resetSearchState() {
  return {
    ...initialState,
  };
}

export function mergeTrackResults(state, { trackIds }) {
  return {
    ...state,
    trackIds: mergeArrays(state.trackIds, trackIds),
  };
}

export function updateSearchKey(state, { searchKey }) {
  return {
    ...state,
    searchKey,
  };
}

export default createReducer(initialState, {
  [types.SEARCH_START]: startSearching,
  [types.SEARCH_STOP]: stopSearching,
  [types.SEARCH_STATE_RESET]: resetSearchState,
  [types.SEARCH_TRACK_RESULTS_MERGE]: mergeTrackResults,
  [types.SEARCH_KEY_UPDATE]: updateSearchKey,
});
