import {
  TOP_COUNT,
  LIMIT_EACH_FETCH,
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_CLEAR,
  CHARTS_FETCH_STOP,
  CHARTS_GENRE_LIST_UPDATE,
} from './chartsConsts';

/* Reducer */
const initialState = {
  selectedGenre: '',
  genreList: [],
  // Visible tracks in current charts page.
  trackIds: [],
  fetching: false,
  fetchOffset: 0,
};

// #TODO: Should we extract fetchOffset?
export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case CHARTS_GENRE_LIST_UPDATE:
      return {
        ...state,
        genreList: [...action.payload],
      };
    case CHARTS_GENRE_CHANGE:
      return {
        ...state,
        selectedGenre: action.payload,
        fetchOffset: 0,
      };
    case CHARTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case CHARTS_RECEIVE:
      return {
        ...state,
        trackIds: [...state.trackIds, ...action.payload.normalized.result].slice(0, TOP_COUNT),
        fetchOffset: state.fetchOffset + LIMIT_EACH_FETCH,
        // fetching: false,
      };
    case CHARTS_CLEAR:
      return {
        ...state,
        trackIds: [],
      };
    case CHARTS_FETCH_STOP:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}