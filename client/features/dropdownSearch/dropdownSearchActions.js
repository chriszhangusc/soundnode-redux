/* DropdownEpic Imports */
import { Observable } from 'rxjs/Rx';
// import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchTracks, fetchUsers } from 'client/common/api/sc/v1';

import * as TYPES from 'client/features/dropdownSearch/dropdownSearchConsts';

export const DROPDOWN_SEARCH_LIMIT = 4;

export const requestDropdownSearch = keyword => ({
  type: TYPES.DROPDOWN_SEARCH_REQUEST,
  payload: {
    keyword,
    limit: DROPDOWN_SEARCH_LIMIT,
  },
});

export const receiveDropdownSearch = results => ({
  type: TYPES.DROPDOWN_SEARCH_RECEIVED,
  payload: results,
});

export const endDropdownSearch = () => ({
  type: TYPES.END_DROPDOWN_SEARCH,
});

export const hideDropdownSearchResults = () => ({
  type: TYPES.HIDE_DROPDOWN_SEARCH_RESULTS,
});

export const showDropdownSearchResults = () => ({
  type: TYPES.SHOW_DROPDOWN_SEARCH_RESULTS,
});

export const clearDropdownSearchResults = () => ({
  type: TYPES.CLEAR_DROPDOWN_SEARCH_RESULTS,
});

export const dropdownArtistsReceived = normalized => ({
  type: TYPES.DROPDOWN_ARTISTS_RECEIVED,
  payload: {
    normalized,
    entities: normalized.entities,
  },
});

export const dropdownTracksReceived = normalized => ({
  type: TYPES.DROPDOWN_TRACKS_RECEIVED,
  payload: {
    normalized,
    entities: normalized.entities,
  },
});

export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideDropdownSearchResults());
    dispatch(clearDropdownSearchResults());
  };
}

/* Search Epic */
export const dropdownSearchEpic = action$ =>
  action$
    .ofType(TYPES.DROPDOWN_SEARCH_REQUEST)
    // This will cause initial fetch delay!
    .debounceTime(250)
    .switchMap((action) => {
      console.log(action);
      const tracksPromise = fetchTracks({ q: action.payload.keyword }, action.payload.limit);
      console.log(tracksPromise);
      const usersPromise = fetchUsers({ q: action.payload.keyword }, action.payload.limit);
      console.log(usersPromise);
      return Observable.fromPromise(Promise.all([tracksPromise, usersPromise]));
    })
    .flatMap((res) => {
      console.log(res);
      return Observable.concat(
        Observable.of(dropdownArtistsReceived(res[1])),
        Observable.of(dropdownTracksReceived(res[0])),
        Observable.of(endDropdownSearch()),
        Observable.of(showDropdownSearchResults()),
      );
    });
