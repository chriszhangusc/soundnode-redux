import { defaultWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from 'features/playQueue/playQueueActions';
import * as types from './searchActionTypes';
import { fetchSearchResults, fetchByNextHref } from './searchApi';
import { isSearching, getSearchNextHref, getSearchKey } from './searchSelectors';

export function startSearching() {
  return {
    type: types.SEARCH_START,
  };
}

export function stopSearching() {
  return {
    type: types.SEARCH_STOP,
  };
}

export function updateSearchNextHref(nextHref) {
  return {
    type: types.SEARCH_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function resetSearchState() {
  return {
    type: types.SEARCH_STATE_RESET,
  };
}

export function updateSearchKey(searchKey) {
  return {
    type: types.SEARCH_KEY_UPDATE,
    payload: {
      searchKey,
    },
  };
}

export function mergeTrackResults(trackIds) {
  return {
    type: types.SEARCH_TRACK_RESULTS_MERGE,
    payload: {
      trackIds,
    },
  };
}

export function receiveSearchResults(normalizedResults, searchKey) {
  return dispatch => {
    const { entities, result, nextHref } = normalizedResults;
    dispatch(mergeEntities(entities));
    dispatch(mergeTrackResults(result));
    // Dynamically update the play queue if needed
    dispatch(appendToPlayQueueIfNeeded(result, `search-${searchKey}`));
    dispatch(updateSearchNextHref(nextHref));
    dispatch(stopSearching());
  };
}

export function loadSearchResults(query) {
  return (dispatch, getState) => {
    const state = getState();
    const searching = isSearching(state);
    dispatch(updateSearchKey(query));
    if (!searching) {
      dispatch(startSearching());
      fetchSearchResults(query)
        .then(normalized => {
          dispatch(receiveSearchResults(normalized, query));
        })
        .catch(err => {
          console.error(err);
          dispatch(defaultWarning());
        });
    }
  };
}

export function loadMoreSearchResults() {
  return (dispatch, getState) => {
    const state = getState();
    const searching = isSearching(state);
    const curNextHref = getSearchNextHref(state);
    const searchKey = getSearchKey(state);
    if (!searching) {
      dispatch(startSearching());
      fetchByNextHref(curNextHref)
        .then(normalized => {
          dispatch(receiveSearchResults(normalized, searchKey));
        })
        .catch(err => {
          console.log(err);
          dispatch(defaultWarning());
        });
    }
  };
}
