// import { fetchUsers, fetchTracks } from 'client/services/SCAPIServices';
import {
  SAGA_SEARCH,
  SAGA_DROPDOWN_SEARCH,
  START_SEARCH,
  END_SEARCH,
  SEARCH_DROPDOWN_ARTISTS_RECEIVED,
  SEARCH_DROPDOWN_TRACKS_RECEIVED,
  SEARCH_RESULTS_RECEIVED,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS
} from 'client/constants/ActionTypes';

export function startSearch() {
  return {
    type: START_SEARCH
  };
}

export function endSearch() {
  return {
    type: END_SEARCH
  };
}

export function searchResultsReceived(normalizedResults) {
  return {
    type: SEARCH_RESULTS_RECEIVED,
    payload: {
      resultMap: normalizedResults.trackMap,
      nextHref: normalizedResults.nextHref
    }
  };
}

export function tracksReceived(normalizedTracks) {
  return {
    type: SEARCH_DROPDOWN_TRACKS_RECEIVED,
    payload: {
      trackMap: normalizedTracks.trackMap,
      nextHref: normalizedTracks.nextHref
    }
  };
}

export function artistsReceived(normalizedArtists) {
  return {
    type: SEARCH_DROPDOWN_ARTISTS_RECEIVED,
    payload: {
      artistMap: normalizedArtists.artistMap,
      nextHref: normalizedArtists.nextHref
    }
  };
}

export function hideSearchResults() {
  return {
    type: HIDE_SEARCH_RESULTS
  };
}

export function showSearchResults() {
  return {
    type: SHOW_SEARCH_RESULTS
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

/* Thunk Actions */

export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideSearchResults());
    dispatch(clearSearchResults());
  };
}

// Actual search logic is in searchSagas.js
// export function doSearch(keyword) {
//   return (dispatch) => {
//     // Show dropdown with fetching sign.
//     dispatch(startSearch());
//     Promise.all([
//       fetchUsers(keyword),
//       fetchTracks(keyword)
//     ])
//     .then(([artistRes, trackRes]) => {
//       const normalizedArtists = normalizeArtists(artistRes.data);
//       const normalizedTracks = normalizeTracks(trackRes.data);
//       dispatch(artistsReceived(normalizedArtists));
//       dispatch(tracksReceived(normalizedTracks));
//       dispatch(endSearch());
//       dispatch(showSearchResults());
//     })
//     .catch((err) => {
//       console.log('Error occurs in doSearch:', err);
//     });
//   };
// }

/* Saga Actions */
export function sagaDropdownSearch(keyword, limit) {
  return {
    type: SAGA_DROPDOWN_SEARCH,
    payload: {
      keyword: keyword.trim().toLowerCase(),
      limit
    }
  };
}

export function sagaSearch(keyword, limit) {
  return {
    type: SAGA_SEARCH,
    payload: {
      keyword: keyword.trim().toLowerCase(),
      limit
    }
  };
}
