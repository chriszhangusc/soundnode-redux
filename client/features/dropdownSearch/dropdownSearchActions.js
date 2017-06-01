/* DropdownEpic Imports */
// import { Observable } from 'rxjs/Rx';
// import { ajax } from 'rxjs/observable/dom/ajax';

import * as TYPES from 'client/features/dropdownSearch/dropdownSearchConsts';

export const DROPDOWN_SEARCH_LIMIT = 4;

// Trigger saga
export function requestDropdownSearch(keyword) {
  return {
    type: TYPES.DROPDOWN_SEARCH_REQUEST,
    payload: {
      keyword,
      limit: DROPDOWN_SEARCH_LIMIT,
    },
  };
}

export function failedToFetchSearchResults() {
  return {
    type: TYPES.DROPDOWN_SEARCH_REQUEST_FAILED,
  };
}

export const endDropdownSearch = () => ({
  type: TYPES.DROPDOWN_SEARCH_END,
});

export const hideDropdownSearchResults = () => ({
  type: TYPES.DROPDOWN_SEARCH_RESULTS_HIDE,
});

export const showDropdownSearchResults = () => ({
  type: TYPES.DROPDOWN_SEARCH_RESULTS_SHOW,
});

export const clearDropdownSearchResults = () => ({
  type: TYPES.DROPDOWN_SEARCH_RESULTS_CLEAR,
});

export const receiveDropdownSearchUsers = normalized => ({
  type: TYPES.DROPDOWN_SEARCH_USERS_RECEIVED,
  payload: normalized,
});

export const receiveDropdownSearchTracks = normalized => ({
  type: TYPES.DROPDOWN_SEARCH_TRACKS_RECEIVED,
  payload: normalized,
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
//     .ofType(TYPES.DROPDOWN_SEARCH_REQUEST)
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
