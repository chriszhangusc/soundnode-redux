import SC from 'soundcloud';
import {
  notificationSuccess,
  notificationWarning,
} from 'client/features/notification/notificationActions';

import { setOAuthToken, removeOAuthToken, isUnauthError } from './authUtils';

import {
  AUTH_USER_LOGIN_STARTED,
  AUTH_USER_LOGIN_SUCCEEDED,
  AUTH_USER_LOGIN_FAILED,
  AUTH_USER_LOGOUT_SUCCEEDED,
  AUTH_FAVORITES_SET,
  AUTH_SESSION_SET,
  OAUTH_TOKEN,
  AUTH_FAVORITES_ADD,
  AUTH_FAVORITES_REMOVE,
} from './authConsts';

import { fetchMe, fetchMyFacorites, likeTrack, unlikeTrack } from './authApi';

export function setFavorites(normalized) {
  return {
    type: AUTH_FAVORITES_SET,
    payload: normalized,
  };
}

export function loginSucceed(me) {
  return {
    type: AUTH_USER_LOGIN_SUCCEEDED,
    payload: me,
  };
}

export function logoutSucceed() {
  return { type: AUTH_USER_LOGOUT_SUCCEEDED };
}

export function setSession(session) {
  return { type: AUTH_SESSION_SET, payload: session };
}

export function doAuth() {
  return (dispatch) => {
    SC.connect().then((session) => {
      // Initialize Session
      dispatch(setSession(session));
      // Set OAuthToken
      sessionStorage.setItem(OAUTH_TOKEN, session.oauth_token);
    });
  };
}

export function startLogin() {
  return {
    type: AUTH_USER_LOGIN_STARTED,
  };
}

export function loginFailed(error) {
  return {
    type: AUTH_USER_LOGIN_FAILED,
    error,
  };
}

export function doLogin() {
  return (dispatch) => {
    dispatch(startLogin());
    SC.connect()
      .then((session) => {
        // Initialize Session
        dispatch(setSession(session));
        // Set OAuthToken
        setOAuthToken(session.oauth_token);
        return fetchMe();
      })
      .then((me) => {
        console.log(me);
        // Fetch my favorite songs
        fetchMyFacorites().then((favorites) => {
          dispatch(setFavorites(favorites));
          dispatch(loginSucceed(me));
          dispatch(notificationSuccess('Login Success'));
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailed(err));
        dispatch(notificationWarning('Failed to login to SoundCloud'));
      });
  };
}

export function syncFavorites() {
  return (dispatch) => {
    fetchMyFacorites().then((favorites) => {
      dispatch(setFavorites(favorites));
    });
  };
}

export function doLogout() {
  return (dispatch) => {
    removeOAuthToken();
    dispatch(logoutSucceed());
    dispatch(notificationSuccess('Logout Success'));
  };
}

export function addToFavorites(trackId) {
  return {
    type: AUTH_FAVORITES_ADD,
    payload: trackId,
  };
}

export function removeFromFavorites(trackId) {
  return {
    type: AUTH_FAVORITES_REMOVE,
    payload: trackId,
  };
}

export function doLikeTrack(trackId) {
  return (dispatch) => {
    likeTrack(trackId)
      .then(() => {
        dispatch(addToFavorites(trackId));
        dispatch(notificationSuccess('Track added to your favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to like track: ', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        }
      });
  };
}

export function doUnlikeTrack(trackId) {
  return (dispatch) => {
    unlikeTrack(trackId)
      .then(() => {
        // Update user favorite list after liking a track
        dispatch(removeFromFavorites(trackId));
        dispatch(notificationSuccess('Track removed from your favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to add this track to favorite list', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        }
      });
  };
}
