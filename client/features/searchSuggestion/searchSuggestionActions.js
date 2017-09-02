import * as types from 'features/searchSuggestion/searchSuggestionActionTypes';

export const SEARCH_SUGGESTION_LIMIT = 4;

// Trigger saga
export function startSearchSuggestion(keyword) {
  return {
    type: types.SEARCH_SUGGESTION_START,
    payload: {
      keyword,
      limit: SEARCH_SUGGESTION_LIMIT,
    },
  };
}

export function stopSearchSuggestion() {
  return {
    type: types.SEARCH_SUGGESTION_STOP,
  };
}

export function failedToFetchSearchResults() {
  return {
    type: types.SEARCH_SUGGESTION_REQUEST_FAIL,
  };
}

export function hideSearchSuggestionResults() {
  return {
    type: types.SEARCH_SUGGESTION_RESULTS_HIDE,
  };
}

export function showSearchSuggestionResults() {
  return {
    type: types.SEARCH_SUGGESTION_RESULTS_SHOW,
  };
}
export function clearSearchSuggestionResults() {
  return {
    type: types.SEARCH_SUGGESTION_RESULTS_CLEAR,
  };
}

export function updateUserResults(userIds) {
  return {
    type: types.SEARCH_SUGGESTION_USER_RESULTS_UPDATE,
    payload: {
      userIds,
    },
  };
}

export function updateTrackResults(trackIds) {
  return {
    type: types.SEARCH_SUGGESTION_TRACK_RESULTS_UPDATE,
    payload: {
      trackIds,
    },
  };
}

export function updateSearchSuggestionQuery(query) {
  return {
    type: types.SEARCH_SUGGESTION_QUERY_UPDATE,
    payload: {
      query,
    },
  };
}

export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideSearchSuggestionResults());
    dispatch(clearSearchSuggestionResults());
  };
}

/* Search Epic (Not currently active) */
// export const searchSuggestionEpic = action$ =>
//   action$
//     .ofType(types.SEARCH_SUGGESTION_REQUEST)
//     // This will cause initial fetch delay!
//     .debounceTime(250)
//     .switchMap((action) => {
//       console.log(action);
//       const tracksPromise = fetchTracks({ q: action.payload.keyword }, action.payload.limit);
//       console.log(tracksPromise);
//       const usersPromise = fetchUsers({ q: action.payload.keyword }, action.payload.limit);
//       console.log(usersPromise);
//       return Observable.fromPromise(Promise.all([tracksPromise, usersPromise]));
//     })
//     .flatMap((res) => {
//       console.log(res);
//       return Observable.concat(
//         Observable.of(dropdownArtistsReceived(res[1])),
//         Observable.of(dropdownTracksReceived(res[0])),
//         Observable.of(endSearchSuggestion()),
//         Observable.of(showSearchSuggestionResults()),
//       );
//     });
