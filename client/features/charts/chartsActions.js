/* Action Creators */
import { notificationFailure } from 'client/features/notification';
import { updateShufflePlaylistIfNeeded } from 'client/features/playlist/playlistActions';
import { fetchCharts, fetchMoreCharts } from './chartsApi';

import {
  isChartsFetching,
  getChartsTrackIds,
  getChartsSelectedGenre,
  getChartsNextHref,
} from './chartsSelectors';

import {
  TOP_COUNT,
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_CLEAR,
  CHARTS_FETCH_STOP,
  CHARTS_CLEAR_STATE,
} from './chartsConsts';

export function clearChartsState() {
  return {
    type: CHARTS_CLEAR_STATE,
  };
}

export function changeGenre(genre) {
  return {
    type: CHARTS_GENRE_CHANGE,
    payload: genre,
  };
}

export function clearAllCharts() {
  return {
    type: CHARTS_CLEAR,
  };
}

export function requestCharts() {
  return {
    type: CHARTS_REQUEST,
  };
}

export function receiveCharts(normalized, playlistName) {
  return {
    type: CHARTS_RECEIVE,
    payload: {
      ...normalized,
      playlistName,
    },
  };
}

export function endChartsFetching() {
  return {
    type: CHARTS_FETCH_STOP,
  };
}

/* Side Effects */

export function loadChartsPage(genre) {
  return async (dispatch) => {
    // Remove all old search results because we do not want them to interfere the new ones.
    dispatch(clearAllCharts());
    dispatch(requestCharts());
    try {
      const normalizedCharts = await fetchCharts(genre);
      dispatch(receiveCharts(normalizedCharts, genre));
      // console.log(normalizedCharts);
      // Update shuffle playlist if visiblePlaylistName is the same as activePlaylistName
      // which means we are loading more songs to the shuffle playlist
      dispatch(updateShufflePlaylistIfNeeded());
    } catch (err) {
      console.error('error: ', err);
      dispatch(notificationFailure('Failed to fetch songs!'));
    } finally {
      // Stop loading spinner
      dispatch(endChartsFetching());
    }
  };
}

export function loadMoreCharts() {
  return async (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const nextHref = getChartsNextHref(state);
    const size = getChartsTrackIds(state).length;

    if (!chartsFetching && size < TOP_COUNT && nextHref) {
      dispatch(requestCharts());
      const genre = getChartsSelectedGenre(state);
      try {
        const normalizedCharts = await fetchMoreCharts(nextHref);
        dispatch(receiveCharts(normalizedCharts, genre));
        dispatch(updateShufflePlaylistIfNeeded());
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(endChartsFetching());
      }
    }
  };
}
