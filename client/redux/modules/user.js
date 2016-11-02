import { fromJS, List } from 'immutable';
import firebase, { firebaseRef, githubProvider } from 'client/firebase';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { trackArraySchema } from 'client/schemas';

const LOGIN_SUCCESS = 'redux-music/user/LOGIN_SUCCESS';
const LOGIN_FAILED = 'redux-music/user/LOGIN_FAILED';
const LOGOUT = 'redux-music/user/LOGOUT';
const LIKE_SUCCESS = 'redux-music/user/LIKE_SUCCESS';
const LIKE_FAILED = 'redux-music/user/LIKE_FAILED';
const LOAD_ALL_LIKES = 'redux-music/user/LOAD_ALL_LIKES';
const UNLIKE_SUCCESS = 'redux-music/user/UNLIKE_SUCCESS';
const LIKED_TRACKS_REQUEST = 'redux-music/user/LIKED_TRACKS_REQUEST';
const LIKED_TRACKS_RECEIVED = 'redux-music/user/LIKED_TRACKS_RECEIVED';
const LIKED_TRACKS_FAILURE = 'redux-music/user/LIKED_TRACKS_FAILURE';

/* Reducer */

const INITIAL_STATE = fromJS({
  likesFetching: false,
  // Saving map from trackId: firebaseKey
  likes: {},
});
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.mergeDeep(fromJS(action.payload.uid));
    case LOGOUT:
      return fromJS({});
    case LOAD_ALL_LIKES:
      return state.set('likes', fromJS(action.payload));
    case LIKE_SUCCESS:
      return state.setIn(
        ['likes', action.payload.record.songId.toString()],
        action.payload.record.firebaseKey
      );
    case UNLIKE_SUCCESS:
      // It will fail without toString!!!
      return state.deleteIn(['likes', action.payload.songId.toString()]);
    case LIKED_TRACKS_REQUEST:
      return state.set('likesFetching', true);
    case LIKED_TRACKS_RECEIVED:
      return state.set('likesFetching', false);
    case LIKE_FAILED:
    case LOGIN_FAILED:
    default:
      return state;
  }
};

export default user;

// Selectors
export const getUserState = state => state.get('user');

export const getUserId = state => getUserState(state).get('uid');
export const getDisplayName = state => getUserState(state).get('displayName');
export const getPhotoUrl = state => getUserState(state).get('photoURL');
export const getUserLikes = state => getUserState(state).get('likes');
export const getLikeIds = state => List(getUserState(state).get('likes').keys());
export const isLikesFetching = state => getUserState(state).get('fetching');
export const isTrackLiked = (state, trackId) => {
  const likes = getUserLikes(state);
  return likes.has(String(trackId));
};
// Return all trackIds liked by current logged in user.
export const getUserLikeIds = state => List(getUserLikes(state).keySeq());

export const loginSuccess = uid => ({
  type: LOGIN_SUCCESS,
  payload: {
    uid,
    message: 'User Login Success!',
  },
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: {
    error,
    message: 'User Login Failed!',
  },
});

export const logout = () => ({
  type: LOGOUT,
});

// This should be grouped in api folder.
export const fetchTracks = trackIds => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/tracks',
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        trackIds: [...trackIds],
      }),
    },
    types: [LIKED_TRACKS_REQUEST, LIKED_TRACKS_RECEIVED, LIKED_TRACKS_FAILURE],
    schema: trackArraySchema,
  },
});

/**
 * Fetch the actual liked track objects
 * @return {[type]} [description]
 */
// FIXME: not sure what this function is about
export const fetchAllLikedTracks = () => (dispatch, getState) => {
  const state = getState();
  const trackIds = getUserLikeIds(state);
  dispatch(fetchTracks(trackIds.toJS()));
};

export const loadAllLikes = likes => ({
  type: LOAD_ALL_LIKES,
  payload: likes,
});

/**
 * Fetch all likes of current user from firebase
 * @return thunk
 */
export const startLoadAllLikes = () => (dispatch, getState) => {
  const state = getState();
  const uid = getUserId(state);
  const likesRef = firebaseRef.child(`${uid}/likes`);
  const likes = {};
  likesRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const songId = childSnapshot.val();
      likes[String(songId)] = childSnapshot.key;
    });
  }).then(() => {
    dispatch(loadAllLikes(likes));
  }, (err) => {
    console.log('Load All Likes Error: ', err);
  });
};

export const startLogin = () => (dispatch) => {
  firebase.auth().signInWithPopup(githubProvider).then((result) => {
    console.log('Auth worked!', result);
    // Store token in localStorage
    const authObj = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    };
    dispatch(loginSuccess(authObj));
    dispatch(startLoadAllLikes());
  }, (error) => {
    dispatch(loginFailed(error));
    console.log('Unable to auth', error);
  });
};

export const startLogout = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    console.log('Logged Out!');
    dispatch(logout());
  });
};

// record is an object where { songId:Firebase Key }
export const likeSongSuccess = record => ({
  type: LIKE_SUCCESS,
  payload: {
    record,
    message: 'Song added to likes',
  },
});

export const likeSongFailed = songId => ({
  type: LIKE_FAILED,
  payload: {
    songId,
    message: 'Failed to add song to likes',
  },
});

export function startLikeSong(songId) {
  return (dispatch, getState) => {
    const state = getState();
    const uid = getUserId(state);
    // If not logged in, display a message to tell the user to login first.
    if (!uid) {
      // Trigger notification!!!!
      console.log('You have to login first.');
      return;
    }
    firebaseRef.child(`${uid}/likes`).push(songId).then((ret) => {
      const record = {
        songId,
        firebaseKey: ret.key,
      };
      dispatch(likeSongSuccess(record));
    }, (err) => {
      if (err) console.log('Push fail', err);
    });
  };
}

export function unlikeSongSuccess(songId) {
  return {
    type: UNLIKE_SUCCESS,
    payload: {
      songId,
      message: 'Song removed from likes',
    },
  };
}

export function startUnlikeSong(songId) {
  return (dispatch, getState) => {
    const state = getState();
    const uid = getUserId(state);
    // If not logged in, display a message to tell the user to login first.
    if (!uid) {
      // Trigger notification!!!!
      console.log('You have to login first.');
      return;
    }
    const likes = getUserLikes(state);
    const firebaseKey = likes[songId];
    firebaseRef.child(`${uid}/likes/${firebaseKey}`).remove((ret) => {
      console.log(ret);
      dispatch(unlikeSongSuccess(songId));
    });
  };
}
