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

const tracksReceived = normalizedTracks => ({
  type: CHARTS_RECEIVE_TRACKS,
  payload: {
    tracksById: normalizedTracks.entities,
    trackIds: normalizedTracks.ids
  }
});

/* Thunks */
export const loadCharts = (genre) => {
  return (dispatch) => {
    dispatch(changeGenre(genre));
    dispatch(startRequestTracks());
    fetchCharts(genre)
      .then((res) => {
        const normalizedTracks = normalizeTracks(res.data);
        dispatch(tracksReceived(normalizedTracks));
      });
  };
};
