import { fromJS } from 'immutable';
import { trackArraySchema } from 'client/schemas';
import {
  SAGA_DROPDOWN_SEARCH,
  START_DROPDOWN_SEARCH,
  END_DROPDOWN_SEARCH,
  DROPDOWN_ARTISTS_RECEIVED,
  DROPDOWN_TRACKS_RECEIVED,

  SAGA_SEARCH,
  START_SEARCH,
  END_SEARCH,
  SEARCH_FAILURE,

  SEARCH_RESULTS_RECEIVED,
  SHOW_DROPDOWN_SEARCH_RESULTS,
  HIDE_DROPDOWN_SEARCH_RESULTS,
  CLEAR_DROPDOWN_SEARCH_RESULTS,
  // FETCH_DROPDOWN_TRACKS,
  // FETCH_DROPDOWN_ARTISTS
} from 'client/constants/ActionTypes';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';

/* Reducers */
const INITIAL_STATE = fromJS({
  shown: false,
  fetching: false,
  dropdownFetching: false,
  // Search dropdown list results
  dropdownArtistIds: [],
  dropdownTrackIds: [],
  // Search results page
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
      return state.set('shown', false);
    case SHOW_DROPDOWN_SEARCH_RESULTS:
      return state.set('shown', true);
    case CLEAR_DROPDOWN_SEARCH_RESULTS:
      return state.set('dropdownArtistIds', fromJS([])).set('dropdownTrackIds', fromJS([]));
    default:
      return state;
  }
}

/* Selectors */
export const getSearchState = state => state.get('search');
export const isSearching = state => getSearchState(state).get('fetching');
export const isSearchResultShown = state => getSearchState(state).get('shown');
export const getSearchResultTrackIds = state => getSearchState(state).get('searchResultTrackIds');
export const getDropdownSearchArtistIds = state => getSearchState(state).get('dropdownArtistIds');
export const getDropdownSearchTrackIds = state => getSearchState(state).get('dropdownTrackIds');

/* Actions */
export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function endSearch() {
  return {
    type: END_SEARCH,
  };
}

export const startDropdownSearch = () => ({
  type: START_DROPDOWN_SEARCH,
});

export const endDropdownSearch = () => ({
  type: END_DROPDOWN_SEARCH,
});

export function hideSearchResults() {
  return {
    type: HIDE_DROPDOWN_SEARCH_RESULTS,
  };
}

export function showSearchResults() {
  return {
    type: SHOW_DROPDOWN_SEARCH_RESULTS,
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_DROPDOWN_SEARCH_RESULTS,
  };
}

/* Thunk Actions */
export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideSearchResults());
    dispatch(clearSearchResults());
  };
}

/* Saga Actions */
export function sagaDropdownSearch(keyword, limit) {
  return {
    type: SAGA_DROPDOWN_SEARCH,
    payload: {
      keyword: keyword.trim().toLowerCase(),
      limit,
    },
  };
}

export function sagaSearch(keyword, limit) {
  return {
    type: SAGA_SEARCH,
    payload: {
      keyword: keyword.trim().toLowerCase(),
      limit,
    },
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
