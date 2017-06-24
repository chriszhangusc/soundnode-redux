import {
  updateVisiblePlaylist,
  appendToVisiblePlaylist,
} from 'client/features/playlist/playlistActions';
import { getVisiblePlaylist, getPlaylistByName } from 'client/features/playlist/playlistSelectors';
import { notificationWarning } from 'client/features/notification/notificationActions';
import { mergeEntities } from 'client/features/entities/entitiesActions';
import { transformSCV2Request } from 'client/common/utils/apiUtils';

import { fetchCharts, fetchMoreCharts } from './chartsApi';

import { isChartsFetching, getChartsNextHref } from './chartsSelectors';

import * as types from './chartsConsts';

export function changeGenre(genre) {
  return {
    type: types.CHARTS_GENRE_CHANGE,
    payload: {
      genre,
    },
  };
}

export function startFetchingCharts() {
  return {
    type: types.CHARTS_FETCH_START,
  };
}

export function stopFetchingCharts() {
  return {
    type: types.CHARTS_FETCH_STOP,
  };
}

export function updateNextHref(nextHref) {
  return {
    type: types.CHARTS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function failedToFetchCharts() {
  return {
    type: types.CHARTS_FETCH_FAIL,
  };
}

export function resetChartsState() {
  return {
    type: types.CHARTS_STATE_RESET,
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    if (!getPlaylistByName(state, genre)) {
      dispatch(startFetchingCharts());
      try {
        const normalizedCharts = await fetchCharts(genre);
        const { entities, result, nextHref } = normalizedCharts;
        dispatch(mergeEntities(entities));
        dispatch(updateVisiblePlaylist(result));
        dispatch(updateNextHref(transformSCV2Request(nextHref)));
        dispatch(stopFetchingCharts());
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
    const currentCharts = getVisiblePlaylist(state);

    if (!chartsFetching && currentCharts.length < 50 && curNextHref) {
      dispatch(startFetchingCharts());
      try {
        const { entities, result, nextHref } = await fetchMoreCharts(curNextHref);
        dispatch(mergeEntities(entities));
        dispatch(appendToVisiblePlaylist(result));
        dispatch(updateNextHref(transformSCV2Request(nextHref)));
        dispatch(stopFetchingCharts());
      } catch (err) {
        console.error(err);
        dispatch(failedToFetchCharts());
        dispatch(notificationWarning('Failed to fetch more songs!'));
      }
    }
  };
}
