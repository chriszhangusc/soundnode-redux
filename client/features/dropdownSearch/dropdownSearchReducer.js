import * as TYPES from 'client/features/dropdownSearch/dropdownSearchConsts';
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

export default function dropdownSearchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case TYPES.START_DROPDOWN_SEARCH:
      return {
        ...state,
        dropdownFetching: true,
      };

    case TYPES.END_DROPDOWN_SEARCH:
      return {
        ...state,
        dropdownFetching: false,
      };

    case TYPES.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResultTrackIds: [],
      };

    case TYPES.DROPDOWN_ARTISTS_RECEIVED:
      return {
        ...state,
        dropdownArtistIds: [...action.payload.normalized.result],
      };

    case TYPES.DROPDOWN_TRACKS_RECEIVED:
      return {
        ...state,
        dropdownTrackIds: [...action.payload.normalized.result],
      };

    case TYPES.HIDE_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownShown: false,
      };

    case TYPES.SHOW_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownShown: true,
      };

    case TYPES.CLEAR_DROPDOWN_SEARCH_RESULTS:
      return {
        ...state,
        dropdownArtistIds: [],
        dropdownTrackIds: [],
      };

    default:
      return state;
  }
}
