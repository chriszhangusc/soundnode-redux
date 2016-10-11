import {
  CHARTS_CHANGE_GENRE,
  CHARTS_REQUEST_TRACKS,
  CHARTS_RECEIVE_TRACKS
} from 'client/constants/ActionTypes';
import { fetchCharts } from 'client/services/SCAPIV2Services';

import { normalizeTracks } from 'client/utils/NormalizeUtils';

const changeGenre = genre => ({
  type: CHARTS_CHANGE_GENRE,
  payload: genre
});

const startRequestTracks = () => ({
  type: CHARTS_REQUEST_TRACKS
});

const tracksReceived = normalized => ({
  type: CHARTS_RECEIVE_TRACKS,
  payload: {
    trackMap: normalized.trackMap,
    nextHref: normalized.nextHref
  }
});

/* Thunks */
export const loadCharts = (genre) => {
  return (dispatch) => {
    dispatch(changeGenre(genre));
    dispatch(startRequestTracks());
    fetchCharts(genre)
      .then((res) => {
        const normalized = normalizeTracks(res.data);
        dispatch(tracksReceived(normalized));
      });
  };
};
