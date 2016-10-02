import { fromJS } from 'immutable';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LIKE_SONG_SUCCESS,
  LIKE_SONG_FAILED,
  LOAD_ALL_LIKES,
  UNLIKE_SONG_SUCCESS
} from '../../../constants/ActionTypes';

const INITIAL_STATE = fromJS({
  likes: {}
});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.mergeDeep(fromJS(action.payload.uid));
    case LOGOUT:
      return fromJS({});
    case LOAD_ALL_LIKES:
      return state.set('likes', fromJS(action.payload));
    case LIKE_SONG_SUCCESS:
      return state.setIn(
        ['likes', action.payload.record.songId],
        action.payload.record.firebaseKey
      );
    case UNLIKE_SONG_SUCCESS:
      // It will fail without toString!!!
      return state.deleteIn(['likes', action.payload.songId.toString()]);
    case LIKE_SONG_FAILED:
    case LOGIN_FAILED:
    default:
      return state;
  }
};

export default user;

// Selectors
export const getUid = state => state.get('uid');

export const getDisplayName = state => state.get('displayName');

export const getPhotoUrl = state => state.get('photoURL');

// Don`t forget to convert it back to js.
export const getLikes = state => state.get('likes').toJS();
