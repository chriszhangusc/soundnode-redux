import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  TRACK_FAILURE,
  TRACK_COMMENTS_REQUEST,
  TRACK_COMMENTS_RECEIVE,
  TRACK_COMMENTS_FAILURE
} from 'client/constants/ActionTypes';

import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import Comment from 'client/models/Comment';

import { trackSchema } from 'client/schemas';
import { CALL_API } from 'client/middlewares/apiMiddleware';

const fetchTrack = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}`,
    method: 'GET',
    types: [TRACK_REQUEST, TRACK_RECEIVE, TRACK_FAILURE],
    schema: trackSchema
  }
});

const fetchComments = (trackId) => {

};

export const loadTrackPage = trackId => (dispatch) => {
  dispatch(fetchTrack(trackId));
}

// export const loadTrack = (trackId) => {
//   return (dispatch) => {
//     dispatch(startTrackFetch());
//     fetchTrack(trackId)
//       .then((res) => {
//         const track = new Track(res.data);
//         // Extract the artist of this track
//         const artist = new Artist(res.data.user);
//         dispatch(trackReceived(track));
//         dispatch(artistReceived(artist));
//         // Now that we got our track, we can start fetching its comments.
//         dispatch(startCommentsFetch());
//         // Nesting then is kinda ugly.
//         fetchComments(trackId).then((commentsRes) => {
//           const normalized = normalizeComments(commentsRes.data);
//           dispatch(commentsReceived(normalized));
//         });
//       });
//   };
// };
