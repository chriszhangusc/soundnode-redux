import { defaultWarning } from '@soundnode-redux/client/src/features/notification/notificationActions';
import { mergeEntities } from '@soundnode-redux/client/src/features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { searchTracks } from '@soundnode-redux/client/src/common/api/trackApi';
import { normalizeTracks } from '@soundnode-redux/client/src/common/utils/normalizeUtils';
import * as types from '@soundnode-redux/client/src/features/search/searchActionTypes';
import { isSearching } from '@soundnode-redux/client/src/features/search/searchSelectors';

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

export function receiveSearchResults(normalizedResults, query) {
  return (dispatch) => {
    const { entities, result } = normalizedResults;
    dispatch(mergeEntities(entities));
    dispatch(mergeTrackResults(result));
    // Dynamically update the play queue if needed
    dispatch(appendToPlayQueueIfNeeded(result, `search-${query}`));
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
      searchTracks(query, 20)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveSearchResults(normalized, query));
        })
        .catch((err) => {
          console.error(err);
          dispatch(defaultWarning());
        });
    }
  };
}
