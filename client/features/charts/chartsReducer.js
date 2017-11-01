import { createReducer } from 'common/utils/reducerUtils';
import * as types from './chartsActionTypes';

/* Reducer */
const initialState = {
  selectedGenre: '',
  fetching: false,
  nextHref: null,
};

export function updateGenre(state, { genre }) {
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

export function resetChartsState(state) {
  return {
    ...state,
  };
}

// Merge tracks to currently selected genre charts
export function mergeCharts(state, { trackIds, genre }) {
  const old = state[genre];
  return {
    ...state,
    [genre]: old ? [...old, ...trackIds] : [...trackIds],
  };
}

export default createReducer(initialState, {
  [types.CHARTS_FETCH_START]: startFetchingCharts,
  [types.CHARTS_FETCH_STOP]: stopFetchingCharts,
  [types.CHARTS_GENRE_UPDATE]: updateGenre,
  [types.CHARTS_NEXT_HREF_UPDATE]: updateNextHref,
  [types.CHARTS_STATE_RESET]: resetChartsState,
  [types.CHARTS_MERGE]: mergeCharts,
  [types.CHARTS_FETCH_FAIL]: stopFetchingCharts,
});
