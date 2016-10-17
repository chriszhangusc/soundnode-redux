import { fromJS } from 'immutable';
import Track from 'client/models/Track';
import CommentMap from 'client/models/CommentMap';
import { denormalizeTrack } from 'client/models/denormalizr';
import { trackSchema } from 'client/schemas';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  TRACK_FAILURE,
  TRACK_COMMENTS_REQUEST,
  TRACK_COMMENTS_RECEIVE,
  TRACK_COMMENTS_FAILURE
} from 'client/constants/ActionTypes';

/* Actions */
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
};

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

/* Reducer */

const INITIAL_STATE = fromJS({
  isTrackFetching: false,
  isCommentsFetching: false,
  track: new Track(),
  comments: new CommentMap(),
  commentsNextHref: null
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_REQUEST:
      return state.set('isTrackFetching', true);
    case TRACK_RECEIVE:
      return state.merge({
        track: denormalizeTrack(action.payload),
        isTrackFetching: false
      });
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const isTrackFetching = state => state.get('isTrackFetching');
export const isCommentsFetching = state => state.get('isCommentsFetching');
export const getTrack = state => state.get('track'); // Return the immutable record
export const getArtist = state => state.get('artist');
