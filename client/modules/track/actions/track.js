import { fetchTrack } from 'client/services/SCAPIServices';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED,
  TRACK_ARTIST_RECEIVED
} from 'client/constants/ActionTypes';

import Track from 'client/models/Track';
import Artist from 'client/models/Artist';

export const startTrackFetch = () => ({
  type: TRACK_START_FETCH
});

export const trackReceived = track => ({
  type: TRACK_RECEIVED,
  payload: track
});

/**
 * [artistReceived description
 * @param  {[type]} artist The artist Immutable.Record of the track.
 * @return {[type]}        [description]
 */
export const artistReceived = artist => ({
  type: TRACK_ARTIST_RECEIVED,
  payload: artist
});

export const loadTrack = (trackId) => {
  return (dispatch) => {
    dispatch(startTrackFetch());
    fetchTrack(trackId)
      .then((res) => {
        const track = new Track(res.data);
        // Extract the artist of this track
        const artist = new Artist(res.data.user);
        dispatch(trackReceived(track));
        dispatch(artistReceived(artist));
      });
  };
};
