import firebase, { firebaseRef, githubProvider } from '../../../firebase/';
import { getUid } from '../reducers/user';
import {
  LOGIN,
  LOGOUT,
  LIKE_SONG,
  LOAD_ALL_LIKES } from '../../../constants/ActionTypes';

export const login = uid => ({
  type: LOGIN,
  payload: uid
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
  const likes = [];
  likesRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const songId = childSnapshot.val();
      likes.push(songId);
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
    dispatch(login(authObj));
    dispatch(startLoadAllLikes());
  }, (error) => {
    console.log('Unable to auth', error);
  });
};

export const startLogout = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    console.log('Logged Out!');
    dispatch(logout());
  });
};

export const likeSong = songId => ({
  type: LIKE_SONG,
  payload: songId
});


export function startLikeSong(songId) {
  return (dispatch, getState) => {
    const uid = getUid(getState());
    // If not logged in, display a message to tell the user to login first.
    if (!uid) {
      console.log('You have to login first.');
      return;
    }
    firebaseRef.child(`${uid}/likes`).push(songId).then(() => {
      dispatch(likeSong(songId));
    }, (err) => {
      if (err) console.log('Push fail', err);
    });
  };
}
