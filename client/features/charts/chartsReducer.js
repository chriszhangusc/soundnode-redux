import { transformSCV2Request } from 'client/common/utils/apiUtils';
import * as types from './chartsConsts';

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

export function startFetchingCharts(state) {
  return {
    ...state,
    fetching: true,
  };
}

export function stopFetchingCharts(state) {
  return {
    ...state,
    fetching: false,
  };
}

export function updateNextHref(state, { nextHref }) {
  return {
    ...state,
    nextHref,
  };
}

export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHARTS_FETCH_START:
      return startFetchingCharts(state);

    case types.CHARTS_FETCH_STOP:
      return stopFetchingCharts(state);

    case types.CHARTS_GENRE_CHANGE:
      return changeGenre(state, action.payload);

    case types.CHARTS_NEXT_HREF_UPDATE:
      return updateNextHref(state, action.payload);

    case types.CHARTS_RECEIVE:
      return receiveCharts(state, action.payload);

    case types.CHARTS_FAIL:
      return {
        ...state,
        fetching: false,
      };

    case types.CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
