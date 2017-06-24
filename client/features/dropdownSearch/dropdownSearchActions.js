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

export const stopDropdownSearch = () => ({
  type: types.DROPDOWN_SEARCH_STOP,
});

export function failedToFetchSearchResults() {
  return {
    type: types.DROPDOWN_SEARCH_REQUEST_FAIL,
  };
}

export const hideDropdownSearchResults = () => ({
  type: types.DROPDOWN_SEARCH_RESULTS_HIDE,
});

export const showDropdownSearchResults = () => ({
  type: types.DROPDOWN_SEARCH_RESULTS_SHOW,
});

export const clearDropdownSearchResults = () => ({
  type: types.DROPDOWN_SEARCH_RESULTS_CLEAR,
});

export const updateUserResults = userIds => ({
  type: types.DROPDOWN_SEARCH_USER_RESULTS_UPDATE,
  payload: {
    userIds,
  },
});

export const updateTrackResults = trackIds => ({
  type: types.DROPDOWN_SEARCH_TRACK_RESULTS_UPDATE,
  payload: {
    trackIds,
  },
});

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
