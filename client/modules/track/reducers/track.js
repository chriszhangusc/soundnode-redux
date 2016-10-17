import { fromJS } from 'immutable';
import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  // TRACK_FAILURE,
  // TRACK_COMMENTS_REQUEST,
  // TRACK_COMMENTS_RECEIVE,
  // TRACK_COMMENTS_FAILURE
} from 'client/constants/ActionTypes';
import Track from 'client/models/Track';
import CommentMap from 'client/models/CommentMap';
import { denormalizeTrack } from 'client/models/denormalizr';

// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isTrackFetching: false,
  isCommentsFetching: false,
  track: new Track(), // The track of TrackDetailsPage
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
export const getIsFetching = state => state.get('isTrackFetching');
export const getTrack = state => state.get('track'); // Return the immutable record
export const getArtist = state => state.get('artist');
