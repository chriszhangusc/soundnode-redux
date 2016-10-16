import { fetchTrack, fetchComments } from 'client/services/SCAPIServices';
import { normalizeComments } from 'client/utils/NormalizeUtils';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED,
  TRACK_ARTIST_RECEIVED,
  COMMENTS_START_FETCH,
  COMMENTS_RECEIVED
} from 'client/constants/ActionTypes';

import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import Comment from 'client/models/Comment';

export const startTrackFetch = () => ({
  type: TRACK_START_FETCH
});

export const trackReceived = track => ({
  type: TRACK_RECEIVED,
  payload: track
});

export const startCommentsFetch = () => ({
  type: COMMENTS_START_FETCH
});

export const commentsReceived = normalized => ({
  type: COMMENTS_RECEIVED,
  payload: {
    resultMap: normalized.resultMap,
    nextHref: normalized.nextHref
  }
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
        // Now that we got our track, we can start fetching its comments.
        dispatch(startCommentsFetch());
        // Nesting then is kinda ugly.
        fetchComments(trackId).then((commentsRes) => {
          const normalized = normalizeComments(commentsRes.data);
          dispatch(commentsReceived(normalized));
        });
      });
  };
};
