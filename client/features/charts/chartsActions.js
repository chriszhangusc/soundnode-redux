import { defaultWarning } from 'features/notification/notificationActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { appendToPlayQueueIfNeeded } from 'features/playQueue/playQueueActions';
import { makeRequest } from 'common/utils/apiUtils';
import { fetchCharts } from 'common/api/trackApi';
import { normalizeTracks } from 'common/utils/normalizeUtils';
import { isChartsFetching, getChartsNextHref, getCurrentChartsTrackIds } from './chartsSelectors';
import * as types from './chartsActionTypes';

export function updateGenre(genre) {
  return {
    type: types.CHARTS_GENRE_UPDATE,
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

export function updateChartsNextHref(nextHref) {
  return {
    type: types.CHARTS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

// For now only stop the spinner.
export function failedToFetchCharts(err) {
  return {
    type: types.CHARTS_FETCH_FAIL,
    error: err,
  };
}

export function resetChartsState() {
  return {
    type: types.CHARTS_STATE_RESET,
  };
}

// Merge trackIds to genre tracks
export function mergeCharts(trackIds, genre) {
  return {
    type: types.CHARTS_MERGE,
    payload: {
      trackIds,
      genre,
    },
  };
}

export function receiveCharts(normalizedCharts, genre, name) {
  return (dispatch) => {
    const { entities, result, nextHref } = normalizedCharts;
    dispatch(mergeEntities(entities));
    dispatch(mergeCharts(result, genre));
    dispatch(updateChartsNextHref(nextHref));
    dispatch(appendToPlayQueueIfNeeded(normalizedCharts.result, name));
    dispatch(stopFetchingCharts());
  };
}

// https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&linked_partitioning=1&limit=25&offset=0&client_id=f9e1e2232182a46705c880554a1011af
function transform(response) {
  return {
    ...response,
    collection: response.collection.map(item => item.track),
  };
}

/* Side Effects */
export function loadChartsPage(genre) {
  return (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    if (!chartsFetching && !state.charts[genre]) {
      dispatch(startFetchingCharts());
      fetchCharts(genre, 20)
        .then(transform)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveCharts(normalized, genre));
        })
        .catch((err) => {
          console.error(err);
          dispatch(failedToFetchCharts(err));
          dispatch(defaultWarning());
        });
    }
  };
}

export function loadMoreCharts(genre, name) {
  return async (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    const curNextHref = getChartsNextHref(state);
    const currentCharts = getCurrentChartsTrackIds(state);
    if (!chartsFetching && currentCharts.length < 50 && curNextHref) {
      dispatch(startFetchingCharts());
      makeRequest(curNextHref)
        .then(transform)
        .then(normalizeTracks)
        .then((normalized) => {
          dispatch(receiveCharts(normalized, genre, name));
        })
        .catch((err) => {
          console.error(err);
          dispatch(failedToFetchCharts(err));
          dispatch(defaultWarning());
        });
    }
  };
}
