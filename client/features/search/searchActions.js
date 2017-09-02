import { mergeEntities } from 'features/entities/entitiesActions';
import { mergeVisiblePlaylist } from 'features/playQueue/playlistActions';
import * as types from './searchActionTypes';
import { fetchSearchResults, fetchByNextHref } from './searchApi';
import { isSearching, getSearchNextHref } from './searchSelectors';

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

export function receiveSearchResults(normalizedResults) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalizedResults;
    dispatch(mergeEntities(entities));
    // dispatch(mergeTrackResults(result));
    dispatch(mergeVisiblePlaylist(result));
    dispatch(updateSearchNextHref(nextHref));
    dispatch(stopSearching());
  };
}

export function loadSearchResults(query) {
  return (dispatch, getState) => {
    const state = getState();
    const searching = isSearching(state);
    if (!searching) {
      dispatch(startSearching());
      fetchSearchResults(query)
        .then((normalized) => {
          dispatch(receiveSearchResults(normalized));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

export function loadMoreSearchResults() {
  return (dispatch, getState) => {
    const state = getState();
    const searching = isSearching(state);
    const curNextHref = getSearchNextHref(state);
    if (!searching) {
      dispatch(startSearching());
      fetchByNextHref(curNextHref).then((normalized) => {
        dispatch(receiveSearchResults(normalized));
      });
    }
  };
}
