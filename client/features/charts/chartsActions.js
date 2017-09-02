import { mergeVisiblePlayQueue } from 'features/playQueue/playQueueActions';
import { getVisiblePlayQueue, getPlayQueueByName } from 'features/playQueue/playQueueSelectors';
import { notificationWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { fetchCharts, fetchMoreCharts } from './chartsApi';
import { isChartsFetching, getChartsNextHref } from './chartsSelectors';
import * as actionTypes from './chartsActionTypes';

export function changeGenre(genre) {
  return {
    type: actionTypes.CHARTS_GENRE_CHANGE,
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

export function receiveCharts(normalizedCharts) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalizedCharts;
    dispatch(mergeEntities(entities));
    dispatch(mergeVisiblePlayQueue(result));
    dispatch(updateChartsNextHref(nextHref));
    dispatch(stopFetchingCharts());
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return async (dispatch, getState) => {
    // Using getState in conditional dispatch
    const state = getState();
    if (!getPlayQueueByName(state, genre)) {
      dispatch(startFetchingCharts());
      try {
        const normalizedCharts = await fetchCharts(genre);
        dispatch(receiveCharts(normalizedCharts));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch songs!'));
      }
    }
  };
}

export function loadMoreCharts() {
  return async (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const curNextHref = getChartsNextHref(state);
    const currentCharts = getVisiblePlayQueue(state);

    if (!chartsFetching && currentCharts.length < 50 && curNextHref) {
      dispatch(startFetchingCharts());
      try {
        const normalizedCharts = await fetchMoreCharts(curNextHref);
        dispatch(receiveCharts(normalizedCharts));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch more songs!'));
      }
    }
  };
}
