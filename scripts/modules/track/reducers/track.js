import { fromJS } from 'immutable';
import {
  TRACK_START_FETCH,
  TRACK_RECEIVED
} from 'client/constants/ActionTypes';
// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isFetching: false,
  title: '',
  description: '',
  artworkUrl: '',
  createdAt: '',
  artistName: '',
  commentCount: 0,
  playbackCount: 0,
  likedCount: 0
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_START_FETCH:
      return state.set('isFetching', true);
    case TRACK_RECEIVED:
      return state.merge(fromJS({
        isFetching: false,
        ...action.payload
      }));
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const getIsFetching = state => state.get('isFetching');
export const getTitle = state => state.get('title');
export const getDescription = state => state.get('description');
export const getArtworkUrl = state => state.get('artworkUrl');
export const getCreatedAt = state => state.get('createdAt');
export const getArtistName = state => state.get('artistName');
export const getCommentCount = state => state.get('commentCount');
export const getPlaybackCount = state => state.get('playbackCount');
export const getLikedCount = state => state.get('likedCount');
