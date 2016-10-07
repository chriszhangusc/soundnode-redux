import { fromJS } from 'immutable';
import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  USER_RECEIVED
} from '../../../constants/ActionTypes';
// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isFetching: false,
  avatarUrl: null,
  name: null,
  followers: 0,
  description: null,
  tracks: []
});

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_ARTIST_FETCH:
      return state.set('isFetching', true);
    case END_ARTIST_FETCH:
      return state.set('isFetching', false);
    case USER_RECEIVED:
      return state.merge(fromJS(action.payload));
    default:
      return state;
  }
};

export const getIsFetching = state => state.get('isFetching');
export const getAvatarUrl = state => state.get('avatarUrl');
export const getName = state => state.get('name');
export const getFollowers = state => state.get('followers');
export const getDescription = state => state.get('description');

export default artist;
