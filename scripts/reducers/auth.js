import { fromJS } from 'immutable';

import { LOGIN, LOGOUT, LIKE_SONG, LOAD_ALL_LIKES } from '../constants/ActionTypes';

const INITIAL_STATE = fromJS({
  likes: []
});

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return state.mergeDeep(fromJS(action.payload));
    case LOGOUT:
      return fromJS({});
    case LIKE_SONG:
      return state.updateIn(['likes'], likes => likes.push(action.payload));
    case LOAD_ALL_LIKES:
      return state.set('likes', fromJS(action.payload));
    default:
      return state;
  }
};

export default auth;

// Selectors
export const getUid = state => state.get('uid');

export const getDisplayName = state => state.get('displayName');

export const getPhotoUrl = state => state.get('photoURL');

// Don`t forget to convert it back to js.
export const getLikes = state => state.get('likes').toJS();
