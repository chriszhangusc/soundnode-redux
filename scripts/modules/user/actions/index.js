import firebase, { firebaseRef, githubProvider } from '../../../firebase/';

import {
  getUid,
  getLikes
} from '../../reducers';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LIKE_SONG_SUCCESS,
  LOAD_ALL_LIKES,
  LIKE_SONG_FAILED,
  UNLIKE_SONG_SUCCESS
 } from '../../../constants/ActionTypes';

export const loginSuccess = uid => ({
  type: LOGIN_SUCCESS,
  payload: {
    uid,
    message: 'User Login Success!'
  }
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: {
    error,
    message: 'User Login Failed!'
  }
});

export const logout = () => ({
  type: LOGOUT
});

export const loadAllLikes = likes => ({
  type: LOAD_ALL_LIKES,
  payload: likes
});

/**
 * Fetch all likes of current user from firebase
 * @return thunk
 */
export const startLoadAllLikes = () => (dispatch, getState) => {
  const state = getState();
  const uid = getUid(state);
  const likesRef = firebaseRef.child(`${uid}/likes`);
  const likes = {};
  likesRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const songId = childSnapshot.val();
      likes[songId] = childSnapshot.key;
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
      photoURL: result.user.photoURL
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
  type: LIKE_SONG_SUCCESS,
  payload: {
    record,
    message: 'Song added to likes'
  }
});

export const likeSongFailed = songId => ({
  type: LIKE_SONG_FAILED,
  payload: {
    songId,
    message: 'Failed to add song to likes'
  }
});


export function startLikeSong(songId) {
  return (dispatch, getState) => {
    const uid = getUid(getState());
    // If not logged in, display a message to tell the user to login first.
    if (!uid) {
      // Trigger notification!!!!
      console.log('You have to login first.');
      return;
    }
    firebaseRef.child(`${uid}/likes`).push(songId).then((ret) => {
      const record = {
        songId,
        firebaseKey: ret.key
      };
      dispatch(likeSongSuccess(record));
    }, (err) => {
      if (err) console.log('Push fail', err);
    });
  };
}

export function unlikeSongSuccess(songId) {
  return {
    type: UNLIKE_SONG_SUCCESS,
    payload: {
      songId,
      message: 'Song removed from likes'
    }
  };
}

export function startUnlikeSong(songId) {
  return (dispatch, getState) => {
    const state = getState();
    const uid = getUid(state);
    // If not logged in, display a message to tell the user to login first.
    if (!uid) {
      // Trigger notification!!!!
      console.log('You have to login first.');
      return;
    }
    const likes = getLikes(state);
    const firebaseKey = likes[songId];
    firebaseRef.child(`${uid}/likes/${firebaseKey}`).remove((ret) => {
      console.log(ret);
      dispatch(unlikeSongSuccess(songId));
    });
  };
}
