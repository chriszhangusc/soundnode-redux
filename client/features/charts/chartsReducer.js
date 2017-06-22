import { transformSCV2Request } from 'client/common/utils/apiUtils';
import {
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_FAIL,
  CHARTS_CLEAR_STATE,
} from './chartsConsts';

/* Reducer */
const initialState = {
  selectedGenre: '',
  // Visible tracks in current charts page.
  fetching: false,
  nextHref: null,
};

export function receiveCharts(state, { nextHref }) {
  return {
    ...state,
    nextHref: transformSCV2Request(nextHref),
    fetching: false,
  };
}

export function changeGenre(state, { genre }) {
  return {
    ...state,
    selectedGenre: genre,
  };
}

export function requestCharts(state) {
  return {
    ...state,
    fetching: true,
  };
}

export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };

    case CHARTS_GENRE_CHANGE:
      return changeGenre(state, action.payload);

    case CHARTS_REQUEST:
      return requestCharts(state);

    case CHARTS_RECEIVE:
      return receiveCharts(state, action.payload);

    case CHARTS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    default:
      return state;
  }
}
