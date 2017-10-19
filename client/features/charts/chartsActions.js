import { notificationWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { fetchCharts, fetchMoreCharts } from './chartsApi';
import { isChartsFetching, getChartsNextHref, getCurrentCharts } from './chartsSelectors';
import * as actionTypes from './chartsActionTypes';

export function updateGenre(genre) {
  return {
    type: actionTypes.CHARTS_GENRE_UPDATE,
    payload: {
      genre,
    },
  };
}

export function startFetchingCharts() {
  return {
    type: actionTypes.CHARTS_FETCH_START,
  };
}

export function stopFetchingCharts() {
  return {
    type: actionTypes.CHARTS_FETCH_STOP,
  };
}

export function updateChartsNextHref(nextHref) {
  return {
    type: actionTypes.CHARTS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function failedToFetchCharts() {
  return {
    type: actionTypes.CHARTS_FETCH_FAIL,
  };
}

export function resetChartsState() {
  return {
    type: actionTypes.CHARTS_STATE_RESET,
  };
}

// Merge trackIds to genre tracks
export function mergeCharts(trackIds, genre) {
  return {
    type: actionTypes.CHARTS_MERGE,
    payload: {
      trackIds,
      genre,
    },
  };
}

export function receiveCharts(normalizedCharts, genre) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalizedCharts;
    dispatch(mergeEntities(entities));
    dispatch(mergeCharts(result, genre));
    dispatch(updateChartsNextHref(nextHref));
    dispatch(stopFetchingCharts());
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return async (dispatch, getState) => {
    // Using getState in conditional dispatch
    const chartsState = getState().charts;
    if (!chartsState[genre]) {
      dispatch(startFetchingCharts());
      try {
        const normalizedCharts = await fetchCharts(genre);
        dispatch(receiveCharts(normalizedCharts, genre));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch songs!'));
      }
    }
  };
}

export function loadMoreCharts(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const curNextHref = getChartsNextHref(state);
    const currentCharts = getCurrentCharts(state);
    if (!chartsFetching && currentCharts.length < 50 && curNextHref) {
      dispatch(startFetchingCharts());
      try {
        const normalizedCharts = await fetchMoreCharts(curNextHref);
        dispatch(receiveCharts(normalizedCharts, genre));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch more songs!'));
      }
    }
  };
}
