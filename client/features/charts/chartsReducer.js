import uniq from 'lodash/uniq';
import { transformSCV2Request } from 'client/common/utils/apiUtils';
import {
  TOP_COUNT,
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_CLEAR,
  CHARTS_FETCH_STOP,
  CHARTS_CLEAR_STATE,
} from './chartsConsts';

/* Reducer */
const initialState = {
  selectedGenre: '',
  // Visible tracks in current charts page.
  trackIds: [],
  fetching: false,
  nextHref: null,
};

// #TODO: Should we extract fetchOffset?
export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };
    case CHARTS_GENRE_CHANGE:
      return {
        ...state,
        selectedGenre: action.payload,
      };
    case CHARTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case CHARTS_RECEIVE:
      return {
        ...state,
        trackIds: uniq([...state.trackIds, ...action.payload.result].slice(0, TOP_COUNT)),
        nextHref: transformSCV2Request(action.payload.nextHref),
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
