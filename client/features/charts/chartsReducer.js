import * as actionTypes from './chartsActionTypes';

/* Reducer */
const initialState = {
  selectedGenre: '',
  fetching: false,
  nextHref: undefined,
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

export default function chartsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHARTS_FETCH_START:
      return startFetchingCharts(state);

    case actionTypes.CHARTS_FETCH_STOP:
      return stopFetchingCharts(state);

    case actionTypes.CHARTS_GENRE_UPDATE:
      return updateGenre(state, action.payload);

    case actionTypes.CHARTS_NEXT_HREF_UPDATE:
      return updateNextHref(state, action.payload);

    case actionTypes.CHARTS_STATE_RESET:
      return resetChartsState(initialState);

    case actionTypes.CHARTS_MERGE:
      return mergeCharts(state, action.payload);

    default:
      return state;
  }
}
