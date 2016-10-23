import { fromJS } from 'immutable';
import { trackArraySchema, artistArraySchema } from 'client/schemas';
import {
  SAGA_SEARCH,
  SAGA_DROPDOWN_SEARCH,
  START_DROPDOWN_SEARCH,
  START_SEARCH,
  END_SEARCH,
  SEARCH_FAILURE,
  SEARCH_DROPDOWN_ARTISTS_RECEIVED,
  SEARCH_DROPDOWN_TRACKS_RECEIVED,
  SEARCH_RESULTS_RECEIVED,
  SHOW_DROPDOWN_SEARCH_RESULTS,
  HIDE_DROPDOWN_SEARCH_RESULTS,
  CLEAR_DROPDOWN_SEARCH_RESULTS
} from 'client/constants/ActionTypes';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';

/* Actions */
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

export function hideSearchResults() {
  return {
    type: HIDE_DROPDOWN_SEARCH_RESULTS
  };
}

export function showSearchResults() {
  return {
    type: SHOW_DROPDOWN_SEARCH_RESULTS
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_DROPDOWN_SEARCH_RESULTS
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

export const fetchDropdownTracks = (keyword, limit) => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/tracks',
    fetchOptions: {
      method: 'get'
    },
    query: {
      limit,
      q: keyword
    },
    types: [START_DROPDOWN_SEARCH, SEARCH_DROPDOWN_TRACKS_RECEIVED, SEARCH_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchDropdownArtists = (keyword, limit) => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/artists',
    fetchOptions: {
      method: 'get'
    },
    query: {
      limit,
      q: keyword
    },
    types: [START_DROPDOWN_SEARCH, SEARCH_DROPDOWN_ARTISTS_RECEIVED, SEARCH_FAILURE],
    schema: artistArraySchema
  }
});

export const fetchAllSearchResults = (keyword, limit) => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/tracks',
    method: 'get',
    query: {
      limit,
      q: keyword
    },
    types: [START_SEARCH, SEARCH_RESULTS_RECEIVED, SEARCH_FAILURE],
    schema: trackArraySchema
  }
});

// export const searchArtists = (keyword, limit) => {
//
// };

/* Reducers */
const INITIAL_STATE = fromJS({
  shown: false,
  fetching: false,
  dropdownFetching: false,
  // Search dropdown list results
  dropdownArtistIds: [],
  dropdownTrackIds: [],
  // Search results page
  searchResultTrackIds: []
});

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SEARCH:
      return state.set('fetching', true);
    case START_DROPDOWN_SEARCH:
      return state.set('dropdownFetching', true);
    case SEARCH_DROPDOWN_ARTISTS_RECEIVED:
      return state.merge(fromJS({
        dropdownArtistIds: action.payload.result,
        dropdownFetching: false
      }));
    case SEARCH_DROPDOWN_TRACKS_RECEIVED:
      return state.merge(fromJS({
        dropdownTrackIds: action.payload.result,
        dropdownFetching: false // This will not be correct
      }));
    case SEARCH_RESULTS_RECEIVED:
      return state.merge(fromJS({
        searchResultTrackIds: action.payload.result,
        fetching: false
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
};
export default search;

/* Selectors */
export const isFetching = state => state.get('fetching');
export const isShown = state => state.get('shown');
export const getSearchTrackIds = state => state.get('searchResultTrackIds');
export const getDropdownSearchArtistIds = state => state.get('dropdownArtistIds');
export const getDropdownSearchTrackIds = state => state.get('dropdownTrackIds');
