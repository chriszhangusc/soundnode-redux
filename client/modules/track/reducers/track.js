import { fromJS } from 'immutable';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED,
  TRACK_ARTIST_RECEIVED,
  COMMENTS_START_FETCH,
  COMMENTS_RECEIVED
} from 'client/constants/ActionTypes';
import Track from 'client/models/Track';
import Artist from 'client/models/Artist';
import CommentMap from 'client/models/CommentMap';
// The currently active artist. (ArtistDetails Page)

const INITIAL_STATE = fromJS({
  isFetching: false,
  track: new Track(),
  artist: new Artist(),
  comments: new CommentMap(),
  isCommentsFetching: false,
  commentsNextHref: null
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTS_START_FETCH:
      return state.set('isCommentsFetching', true);
    case COMMENTS_RECEIVED:
      return state.merge(fromJS({
        isCommentsFetching: false,
        comments: action.payload.resultMap,
        commentsNextHref: action.payload.nextHref
      }));
    case TRACK_START_FETCH:
      return state.set('isFetching', true);
    case TRACK_RECEIVED:
      return state.mergeDeep(fromJS({
        isFetching: false,
        track: action.payload
      }));
    case TRACK_ARTIST_RECEIVED:
      return state.mergeDeep(fromJS({
        isFetching: false,
        artist: action.payload
      }));
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const getIsFetching = state => state.get('isFetching');
export const getTrack = state => state.get('track'); // Return the immutable record
export const getArtist = state => state.get('artist');
// export const getTitle = state => state.get('title');
// export const getDescription = state => state.get('description');
// export const getArtworkUrl = state => state.get('artworkUrl');
// export const getCreatedAt = state => state.get('createdAt');
// export const getArtistName = state => state.get('artistName');
// export const getCommentCount = state => state.get('commentCount');
// export const getPlaybackCount = state => state.get('playbackCount');
// export const getLikedCount = state => state.get('likedCount');
