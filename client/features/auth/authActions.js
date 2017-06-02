import SC from 'soundcloud';
import {
  notificationSuccess,
  notificationWarning,
  notificationRequireLogin,
} from 'client/features/notification/notificationActions';

import {
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_LOGOUT_SUCCESS,
  AUTH_FAVORITES_SET,
  AUTH_SESSION_SET,
  OAUTH_TOKEN,
  AUTH_FAVORITES_ADD,
  AUTH_FAVORITES_REMOVE,
} from './authConsts';

import { isLoggedIn } from './authSelectors';

import { fetchMe, fetchMyFacorites, likeTrack, unlikeTrack } from './authApi';

export function setFavorites(normalized) {
  return {
    type: AUTH_FAVORITES_SET,
    payload: normalized,
  };
}

export function loginSuccess(me) {
  return {
    type: AUTH_USER_LOGIN_SUCCESS,
    payload: me,
  };
}

export function logoutSuccess() {
  return { type: AUTH_USER_LOGOUT_SUCCESS };
}

export function setSession(session) {
  return { type: AUTH_SESSION_SET, payload: session };
}

export function doLogin() {
  return (dispatch) => {
    SC.connect()
      .then((session) => {
        // Initialize Session
        dispatch(setSession(session));
        // Set OAuthToken
        sessionStorage.setItem(OAUTH_TOKEN, session.oauth_token);
        return fetchMe();
      })
      .then((me) => {
        console.log(me);
        // Fetch my favorite songs
        fetchMyFacorites().then((favorites) => {
          dispatch(setFavorites(favorites));
          dispatch(loginSuccess(me));
          dispatch(notificationSuccess('Login Success'));
        });
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
    sessionStorage.removeItem(OAUTH_TOKEN);
    dispatch(logoutSuccess());
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
  return (dispatch, getState) => {
    const state = getState();
    const loggedIn = isLoggedIn(state);
    if (loggedIn) {
      likeTrack(trackId)
        .then(() => {
          dispatch(notificationSuccess('Added to your favorites'));
          dispatch(addToFavorites(trackId));
          dispatch(syncFavorites());
        })
        .catch((err) => {
          console.log('Failed to add this track to favorite list', err);
        });
    } else {
      dispatch(notificationRequireLogin());
    }
  };
}

export function doDislikeTrack(trackId) {
  return (dispatch, getState) => {
    const state = getState();
    const loggedIn = isLoggedIn(state);
    if (loggedIn) {
      unlikeTrack(trackId)
        .then(() => {
          // Update user favorite list after liking a track
          dispatch(removeFromFavorites(trackId));
          dispatch(syncFavorites());
          dispatch(notificationSuccess('Removed from your favorites'));
        })
        .catch((err) => {
          console.log('Failed to add this track to favorite list', err);
        });
    } else {
      dispatch(notificationRequireLogin());
    }
  };
}
