import { fetchTrack } from 'client/services/SCAPIServices';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED
} from 'client/constants/ActionTypes';

export const startTrackFetch = () => ({
  type: TRACK_START_FETCH
});

export const trackReceived = (track) => ({
  type: TRACK_RECEIVED,
  payload: {
    title: track.title,
    description: track.description,
    artworkUrl: track.artwork_url,
    createdAt: track.created_at,
    artistName: track.user ? track.user.username : '',
    commentCount: track.comment_count
  }
});

export const loadTrack = (trackId) => {
  return (dispatch) => {
    dispatch(startTrackFetch());
    fetchTrack(trackId)
      .then((res) => {
        dispatch(trackReceived(res.data));
      });
  };
};
