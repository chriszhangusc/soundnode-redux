import SC from 'soundcloud';
import {
  notificationSuccess,
  notificationWarning,
} from 'client/features/notification/notificationActions';

import { getOAuthToken, setOAuthToken, removeOAuthToken, isUnauthError } from './authUtils';

import {
  AUTH_USER_LOGIN_STARTED,
  AUTH_USER_LOGIN_SUCCEEDED,
  AUTH_USER_LOGIN_FAILED,
  AUTH_USER_LOGOUT_SUCCEEDED,
  AUTH_FAVORITES_SET,
  AUTH_SESSION_SET,
  AUTH_FAVORITES_ADD,
  AUTH_FAVORITES_REMOVE,
  AUTH_REPOSTS_ADD,
  AUTH_REPOSTS_REMOVE,
  AUTH_REPOSTS_SET,
  AUTH_USER_ME_SET,
} from './authConsts';

import {
  fetchMe,
  fetchMyFavoritesIds,
  likeTrack,
  unlikeTrack,
  repost,
  deleteRepost,
  fetchMyRepostIds,
} from './authApi';

import { getMe } from './authSelectors';

export function setReposts(reposts) {
  return {
    type: AUTH_REPOSTS_SET,
    payload: {
      reposts,
    },
  };
}

export function setFavorites(favorites) {
  return {
    type: AUTH_FAVORITES_SET,
    payload: {
      favorites,
    },
  };
}

export function setMe(me) {
  return {
    type: AUTH_USER_ME_SET,
    payload: {
      me,
    },
  };
}

export function loginSucceed() {
  return {
    type: AUTH_USER_LOGIN_SUCCEEDED,
  };
}

export function logoutSucceed() {
  return { type: AUTH_USER_LOGOUT_SUCCEEDED };
}

export function setSession(session) {
  return { type: AUTH_SESSION_SET, payload: session };
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

export function syncFavorites() {
  return dispatch =>
    fetchMyFavoritesIds().then((favorites) => {
      dispatch(setFavorites(favorites));
    });
}

export function syncReposts() {
  return dispatch =>
    fetchMyRepostIds().then((reposts) => {
      dispatch(setReposts(reposts));
    });
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

export function addToReposts(trackId) {
  return {
    type: AUTH_REPOSTS_ADD,
    payload: {
      trackId,
    },
  };
}

export function removeFromReposts(trackId) {
  return {
    type: AUTH_REPOSTS_REMOVE,
    payload: {
      trackId,
    },
  };
}

export function doAuth() {
  return dispatch =>
    SC.connect().then((session) => {
      // Initialize Session
      dispatch(setSession(session));
      // Set OAuthToken
      setOAuthToken(session.oauth_token);
    });
}

// Load everything about me, favorites, reposts...
export function loadMe() {
  // return dispatch => ;
  return dispatch =>
    fetchMe()
      .then((me) => {
        dispatch(setMe(me));
        return Promise.all([dispatch(syncFavorites()), dispatch(syncReposts())]);
      })
      .then(() => {
        dispatch(loginSucceed());
        dispatch(notificationSuccess('Login Success'));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailed(err));
        dispatch(notificationWarning('Failed to login to SoundCloud'));
      });
}

export function doLogin() {
  return (dispatch) => {
    dispatch(startLogin());
    dispatch(doAuth()).then(() => dispatch(loadMe()));
  };
}

export function loginIfNeeded() {
  return (dispatch, getState) => {
    const token = getOAuthToken();
    const state = getState();
    const me = getMe(state);
    // Check if we need to log the user in.
    if (token && !me) {
      dispatch(startLogin());
      dispatch(loadMe());
    }
  };
}

export function doLogout() {
  return (dispatch) => {
    removeOAuthToken();
    dispatch(logoutSucceed());
    dispatch(notificationSuccess('Logout Success'));
  };
}

export function doLikeTrack(trackId) {
  return (dispatch) => {
    likeTrack(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track added to your favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to like track: ', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed to add track to favorites'));
        }
      });
  };
}

export function doUnlikeTrack(trackId) {
  return (dispatch) => {
    unlikeTrack(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track removed from your favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to remove this track from favorites', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed to remove track from favorites'));
        }
      });
  };
}

export function createRepost(trackId) {
  return (dispatch) => {
    repost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track successfully reposted'));
        dispatch(syncReposts());
      })
      .catch((err) => {
        console.log('Failed to create repost', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed to create repost'));
        }
      });
  };
}

export function removeRepost(trackId) {
  return (dispatch) => {
    deleteRepost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track removed from reposts'));
        dispatch(syncReposts());
      })
      .catch((err) => {
        console.log('Failed to remove repost', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed to remove repost'));
        }
      });
  };
}
