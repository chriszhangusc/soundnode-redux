import { fromJS } from 'immutable';
import TrackMap from 'client/models/TrackMap';
import ArtistMap from 'client/models/ArtistMap';
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

/* Reducers */
const INITIAL_STATE = fromJS({
  isShown: false,
  isFetching: false,
  // Search dropdown list results
  dropdownArtists: new ArtistMap(),
  dropdownTracks: new TrackMap(),
  // Search results page
  searchResults: new TrackMap(), // For now just display all tracks.
  artistNextHref: null,
  trackNextHref: null
});

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SEARCH:
      return state.set('isFetching', true);
    case END_SEARCH:
      return state.set('isFetching', false);
    case SEARCH_DROPDOWN_ARTISTS_RECEIVED:
      // Set payload(users) to users
      return state.set('dropdownArtists', action.payload.artistMap).merge({
        artistNextHref: action.payload.nextHref
      });
    case SEARCH_DROPDOWN_TRACKS_RECEIVED:
      return state
        .set('dropdownTracks', action.payload.trackMap);
    case SEARCH_RESULTS_RECEIVED:
      return state.set('searchResults', action.payload.resultMap).merge({
        trackNextHref: action.payload.nextHref
      });
    case HIDE_SEARCH_RESULTS:
      return state.set('isShown', false);
    case SHOW_SEARCH_RESULTS:
      return state.set('isShown', true);
    case CLEAR_SEARCH_RESULTS:
      return state.set('dropdownArtists', new ArtistMap()).set('dropdownTracks', new TrackMap());
    default:
      return state;
  }
};
export default search;

/* Selectors */
export const getArtistMap = state => state.get('dropdownArtists');
export const getTrackMap = state => state.get('dropdownTracks');
export const getArtistNextHref = state => state.get('userNextHref');
export const getTrackNextHref = state => state.get('trackNextHref');
export const isFetching = state => state.get('isFetching');
export const isShown = state => state.get('isShown');
export const getSearchResults = state => state.get('searchResults');
