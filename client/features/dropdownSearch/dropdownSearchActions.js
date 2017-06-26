import * as types from 'features/dropdownSearch/dropdownSearchConsts';

export const DROPDOWN_SEARCH_LIMIT = 4;

// Trigger saga
export function startDropdownSearch(keyword) {
  return {
    type: types.DROPDOWN_SEARCH_START,
    payload: {
      keyword,
      limit: DROPDOWN_SEARCH_LIMIT,
    },
  };
}

export function stopDropdownSearch() {
  return {
    type: types.DROPDOWN_SEARCH_STOP,
  };
}

export function failedToFetchSearchResults() {
  return {
    type: types.DROPDOWN_SEARCH_REQUEST_FAIL,
  };
}

export function hideDropdownSearchResults() {
  return {
    type: types.DROPDOWN_SEARCH_RESULTS_HIDE,
  };
}

export function showDropdownSearchResults() {
  return {
    type: types.DROPDOWN_SEARCH_RESULTS_SHOW,
  };
}
export function clearDropdownSearchResults() {
  return {
    type: types.DROPDOWN_SEARCH_RESULTS_CLEAR,
  };
}

export function updateUserResults(userIds) {
  return {
    type: types.DROPDOWN_SEARCH_USER_RESULTS_UPDATE,
    payload: {
      userIds,
    },
  };
}

export function updateTrackResults(trackIds) {
  return {
    type: types.DROPDOWN_SEARCH_TRACK_RESULTS_UPDATE,
    payload: {
      trackIds,
    },
  };
}

export function updateDropdownSearchQuery(query) {
  return {
    type: types.DROPDOWN_SEARCH_QUERY_UPDATE,
    payload: {
      query,
    },
  };
}

export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideDropdownSearchResults());
    dispatch(clearDropdownSearchResults());
  };
}

/* Search Epic (Not currently active)*/
// export const dropdownSearchEpic = action$ =>
//   action$
//     .ofType(types.DROPDOWN_SEARCH_REQUEST)
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
//         Observable.of(endDropdownSearch()),
//         Observable.of(showDropdownSearchResults()),
//       );
//     });
