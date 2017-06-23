/* Action Creators */
import {
  updateVisiblePlaylist,
  appendToVisiblePlaylist,
} from 'client/features/playlist/playlistActions';
import { getVisiblePlaylist, getPlaylistByName } from 'client/features/playlist/playlistSelectors';
import { notificationWarning } from 'client/features/notification/notificationActions';

import { fetchCharts, fetchMoreCharts } from './chartsApi';

import {
  isChartsFetching,
  getChartsNextHref,
} from './chartsSelectors';

import * as types from './chartsConsts';

export function clearChartsState() {
  return {
    type: types.CHARTS_CLEAR_STATE,
  };
}

export function changeGenre(genre) {
  return {
    type: types.CHARTS_GENRE_CHANGE,
    payload: {
      genre,
    },
  };
}

export function requestCharts() {
  return {
    type: types.CHARTS_REQUEST,
  };
}

export function receiveCharts(normalized) {
  return {
    type: types.CHARTS_RECEIVE,
    payload: {
      ...normalized,
    },
  };
}

export function failedToFetchCharts() {
  return {
    type: types.CHARTS_FAIL,
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!getPlaylistByName(state, genre)) {
      dispatch(requestCharts());
      try {
        const normalizedCharts = await fetchCharts(genre);
        dispatch(receiveCharts(normalizedCharts));
        const trackIds = normalizedCharts.result;
        dispatch(updateVisiblePlaylist(trackIds));
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
    const nextHref = getChartsNextHref(state);
    const currentCharts = getVisiblePlaylist(state);

    if (!chartsFetching && currentCharts.length < 50 && nextHref) {
      dispatch(requestCharts());
      try {
        const normalizedCharts = await fetchMoreCharts(nextHref);
        dispatch(receiveCharts(normalizedCharts));
        const trackId = normalizedCharts.result;
        dispatch(appendToVisiblePlaylist(trackId));
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch more songs!'));
      }
    }
  };
}
