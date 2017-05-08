/* #TODO: Separate general search and dropdown search */
import { trackArraySchema } from 'client/app/schema';

import { CALL_API } from 'client/app/middlewares/apiMiddleware';

/* DropdownEpic Imports */
import { Observable } from 'rxjs/Rx';
// import { ajax } from 'rxjs/observable/dom/ajax';
import { fetchTracks, fetchUsers } from 'client/api/sc/v1';

// Dropdown search
export const START_DROPDOWN_SEARCH = 'START_DROPDOWN_SEARCH';
export const END_DROPDOWN_SEARCH = 'END_DROPDOWN_SEARCH';

export const DROPDOWN_ARTISTS_RECEIVED = 'DROPDOWN_ARTISTS_RECEIVED';
export const DROPDOWN_TRACKS_RECEIVED = 'DROPDOWN_TRACKS_RECEIVED';
export const SHOW_DROPDOWN_SEARCH_RESULTS = 'SHOW_DROPDOWN_SEARCH_RESULTS';
export const HIDE_DROPDOWN_SEARCH_RESULTS = 'HIDE_DROPDOWN_SEARCH_RESULTS';
export const CLEAR_DROPDOWN_SEARCH_RESULTS = 'CLEAR_DROPDOWN_SEARCH_RESULTS';

export const DROPDOWN_SEARCH_REQUEST = 'DROPDOWN_SEARCH_REQUEST';
export const DROPDOWN_SEARCH_RECEIVED = 'DROPDOWN_SEARCH_RECEIVED';

// Search page
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SAGA_SEARCH = 'SAGA_SEARCH';
export const START_SEARCH = 'START_SEARCH';
export const END_SEARCH = 'END_SEARCH';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED';

export const DROPDOWN_SEARCH_LIMIT = 4;
export const SEARCH_LIMIT = 20;

/* Reducers */
const INITIAL_STATE = {
  dropdownShown: false,
  dropdownFetching: false,
  // Search dropdown list results
  dropdownArtistIds: [],
  dropdownTrackIds: [],
  // Search results page
  fetching: false,
  searchResultTrackIds: [],
};

export default function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_SEARCH:
      return {
        ...state,
        fetching: true,
      };

    case START_DROPDOWN_SEARCH:
      return {
        ...state,
        dropdownFetching: true,
      };

    case END_DROPDOWN_SEARCH:
      return {
        ...state,
        dropdownFetching: false,
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResultTrackIds: [],
      };

    case DROPDOWN_ARTISTS_RECEIVED:
      return {
        ...state,
        dropdownArtistIds: [...action.payload.result],
      };

    case DROPDOWN_TRACKS_RECEIVED:
      return {
        ...state,
        dropdownTrackIds: [...action.payload.result],
      };

    case SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        searchResultTrackIds: [...action.payload.result],
        fetching: false,
      };

    case HIDE_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownShown: false,
      };

    case SHOW_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownShown: true,
      };

    case CLEAR_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownArtistIds: [],
        dropdownTrackIds: [],
      };

    default:
      return state;
  }
}

/* Selectors */
export const getSearchState = state => state.search;
export const isSearching = state => getSearchState(state).fetching;
export const isDropdownSearching = state => getSearchState(state).dropdownFetching;
export const isDropdownShown = state => getSearchState(state).dropdownShown;
export const getSearchResultTrackIds = state => getSearchState(state).searchResultTrackIds;
export const getDropdownSearchArtistIds = state => getSearchState(state).dropdownArtistIds;
export const getDropdownSearchTrackIds = state => getSearchState(state).dropdownTrackIds;

/* Action Creators */
export const startSearch = () => ({
  type: START_SEARCH,
});

export const endSearch = () => ({
  type: END_SEARCH,
});


export const requestDropdownSearch = keyword => ({
  type: DROPDOWN_SEARCH_REQUEST,
  payload: {
    keyword,
    limit: DROPDOWN_SEARCH_LIMIT,
  },
});

export const receiveDropdownSearch = results => ({
  type: DROPDOWN_SEARCH_RECEIVED,
  payload: results,
});

// export const startDropdownSearch = () => ({
//   type: START_DROPDOWN_SEARCH,
// });
//
export const endDropdownSearch = () => ({
  type: END_DROPDOWN_SEARCH,
});

export const hideDropdownSearchResults = () => ({
  type: HIDE_DROPDOWN_SEARCH_RESULTS,
});

export const showDropdownSearchResults = () => ({
  type: SHOW_DROPDOWN_SEARCH_RESULTS,
});

export const clearDropdownSearchResults = () => ({
  type: CLEAR_DROPDOWN_SEARCH_RESULTS,
});

export const clearSearchPageResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});

/* Thunk Actions */
export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideDropdownSearchResults());
    dispatch(clearDropdownSearchResults());
  };
}

export const dropdownArtistsReceived = normalized => ({
  type: DROPDOWN_ARTISTS_RECEIVED,
  payload: normalized,
  entities: normalized.entities,
});

export const dropdownTracksReceived = normalized => ({
  type: DROPDOWN_TRACKS_RECEIVED,
  payload: normalized,
  entities: normalized.entities,
});

export const fetchAllSearchResults = (keyword, limit) => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/tracks',
    method: 'get',
    query: {
      limit,
      q: keyword,
    },
    types: [START_SEARCH, SEARCH_RESULTS_RECEIVED, SEARCH_FAILURE],
    schema: trackArraySchema,
  },
});

/* Search Epic */
export const dropdownSearchEpic = action$ =>
  action$.ofType(DROPDOWN_SEARCH_REQUEST)
  // This will cause initial fetch delay!
    .debounceTime(250)
    .switchMap((action) => {
      const tracksPromise = fetchTracks({ q: action.payload.keyword }, action.payload.limit);
      const usersPromise = fetchUsers({ q: action.payload.keyword }, action.payload.limit);
      return Observable.fromPromise(Promise.all([tracksPromise, usersPromise]));
    })
    .flatMap(res => Observable.concat(
      Observable.of(dropdownArtistsReceived(res[1])),
      Observable.of(dropdownTracksReceived(res[0])),
      Observable.of(endDropdownSearch()),
      Observable.of(showDropdownSearchResults()),
    ));
