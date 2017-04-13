/* Action Creators */
import { formatGenre } from 'client/utils/FormatUtils';
import { fetchChartsFromSC } from 'client/api/sc/v2';
import { notificationFailure } from 'client/redux/modules/notification';
import { updateShufflePlaylistIfNeeded } from 'client/redux/modules/playlist/actions';
import { TOP_COUNT } from 'client/constants/ChartsConsts';
import { isChartsFetching, getChartsFetchOffset, getChartsTrackIds, getChartsGenre } from './selectors';
import {
  CHARTS_GENRE_CHANGE,
  CHARTS_REQUEST,
  CHARTS_RECEIVE,
  CHARTS_CLEAR,
  CHARTS_SPINNER_STOP,
} from './actionTypes';

export const changeGenre = genre => ({ type: CHARTS_GENRE_CHANGE, payload: genre });

export const clearAllCharts = () => ({ type: CHARTS_CLEAR });

const requestCharts = () => ({ type: CHARTS_REQUEST });

const receiveCharts = (normalized, playlistName) => ({
  type: CHARTS_RECEIVE,
  playlistName,
  payload: normalized,
  entities: normalized.entities,
});

const stopSpinner = () => ({ type: CHARTS_SPINNER_STOP });

/* Side Effects */

// http://localhost:3001/sc/api-v2/charts?genre=country&limit=20&offset=0&client
// _id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea

/**
 * This is the domain logic of charts page, it gets fired whenever we need to fetch charts
 * and do other stuffs when results comes back like update the shuffle playlist if we are in
 * shuffle mode
 * @param {string} genre The genre of what we need to fetch
 * @returns Thunk function
 */
export function fetchChartsAndUpdatePlaylist(genre) {
  return async (dispatch, getState) => {
    const state = getState();
    const offset = getChartsFetchOffset(state);
    dispatch(requestCharts());
    try {
      const normalizedCharts = await fetchChartsFromSC(genre, offset);
      // #TODO: Verify results!!
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
      dispatch(stopSpinner());
    }
  };
}

export function loadChartsPage(genre) {
  return (dispatch) => {
    const formattedGenre = formatGenre(genre);
    // Remove all old search results because we do not want them to interfere the new ones.
    dispatch(clearAllCharts());

    dispatch(fetchChartsAndUpdatePlaylist(formattedGenre));
  };
}

export function loadMoreCharts() {
  return (dispatch, getState) => {
    const state = getState();
    const chartsFetching = isChartsFetching(state);
    // Limit the number of fetched results.
    const size = getChartsTrackIds(state).length;
    if (!chartsFetching && size < TOP_COUNT) {
      const genre = getChartsGenre(state);
      const formattedGenre = formatGenre(genre);
      dispatch(fetchChartsAndUpdatePlaylist(formattedGenre));
    }
  };
}

// export function handleChartsFetchFail() {
//   return {
//     type: CHARTS_FETCH_FAIL,
//   };
// }
