import { fromJS } from 'immutable';
import { trackArraySchema } from 'client/schemas';

import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
// Dropdown search
export const SAGA_DROPDOWN_SEARCH = 'redux-music/search/SAGA_DROPDOWN_SEARCH';
export const START_DROPDOWN_SEARCH = 'redux-music/search/START_DROPDOWN_SEARCH';
export const END_DROPDOWN_SEARCH = 'redux-music/search/END_DROPDOWN_SEARCH';
export const DROPDOWN_ARTISTS_RECEIVED = 'redux-music/search/DROPDOWN_ARTISTS_RECEIVED';
export const DROPDOWN_TRACKS_RECEIVED = 'redux-music/search/DROPDOWN_TRACKS_RECEIVED';
export const SHOW_DROPDOWN_SEARCH_RESULTS = 'redux-music/search/SHOW_DROPDOWN_SEARCH_RESULTS';
export const HIDE_DROPDOWN_SEARCH_RESULTS = 'redux-music/search/HIDE_DROPDOWN_SEARCH_RESULTS';
export const CLEAR_DROPDOWN_SEARCH_RESULTS = 'redux-music/search/CLEAR_DROPDOWN_SEARCH_RESULTS';

// Search page
export const CLEAR_SEARCH_RESULTS = 'redux-music/search/CLEAR_SEARCH_RESULTS';
export const SAGA_SEARCH = 'redux-music/search/SAGA_SEARCH';
export const START_SEARCH = 'redux-music/search/START_SEARCH';
export const END_SEARCH = 'redux-music/search/END_SEARCH';
export const SEARCH_FAILURE = 'redux-music/search/SEARCH_FAILURE';
export const SEARCH_RESULTS_RECEIVED = 'redux-music/search/SEARCH_RESULTS_RECEIVED';

export const DROPDOWN_LIMIT = 5;
export const SEARCH_LIMIT = 20;

/* Reducers */
const INITIAL_STATE = fromJS({
  dropdownShown: false,
  dropdownFetching: false,
  // Search dropdown list results
  dropdownArtistIds: [],
  dropdownTrackIds: [],
  // Search results page
  fetching: false,
  searchResultTrackIds: [],
});

export default function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_SEARCH:
      return state.set('fetching', true);
    case START_DROPDOWN_SEARCH:
      return state.set('dropdownFetching', true);
    case END_DROPDOWN_SEARCH:
      return state.set('dropdownFetching', false);
    case CLEAR_SEARCH_RESULTS:
      return state.set('searchResultTrackIds', fromJS([]));
    case DROPDOWN_ARTISTS_RECEIVED:
      return state.set('dropdownArtistIds', fromJS(action.payload.result));
    case DROPDOWN_TRACKS_RECEIVED:
      return state.set('dropdownTrackIds', fromJS(action.payload.result));
    case SEARCH_RESULTS_RECEIVED:
      return state.merge(fromJS({
        searchResultTrackIds: action.payload.result,
        fetching: false,
      }));
    case HIDE_DROPDOWN_SEARCH_RESULTS:
      return state.set('dropdownShown', false);
    case SHOW_DROPDOWN_SEARCH_RESULTS:
      return state.set('dropdownShown', true);
    case CLEAR_DROPDOWN_SEARCH_RESULTS:
      return state.set('dropdownArtistIds', fromJS([])).set('dropdownTrackIds', fromJS([]));
    default:
      return state;
  }
}

/* Selectors */
export const getSearchState = state => state.get('search');
export const isSearching = state => getSearchState(state).get('fetching');
export const isDropdownSearching = state => getSearchState(state).get('dropdownFetching');
export const isDropdownShown = state => getSearchState(state).get('dropdownShown');
export const getSearchResultTrackIds = state => getSearchState(state).get('searchResultTrackIds');
export const getDropdownSearchArtistIds = state => getSearchState(state).get('dropdownArtistIds');
export const getDropdownSearchTrackIds = state => getSearchState(state).get('dropdownTrackIds');

/* Actions */
export const startSearch = () => ({
  type: START_SEARCH,
});

export const endSearch = () => ({
  type: END_SEARCH,
});

export const startDropdownSearch = () => ({
  type: START_DROPDOWN_SEARCH,
});

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

/* Saga Actions */
export const sagaDropdownSearch = (keyword, limit = DROPDOWN_LIMIT) => ({
  type: SAGA_DROPDOWN_SEARCH,
  payload: {
    keyword: keyword.trim().toLowerCase(),
    limit,
  },
});

export const sagaSearch = (keyword, limit = SEARCH_LIMIT) => ({
  type: SAGA_SEARCH,
  payload: {
    keyword: keyword.trim().toLowerCase(),
    limit,
  },
});

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
