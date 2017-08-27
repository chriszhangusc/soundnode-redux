import SC from 'soundcloud';
import {
  notificationSuccess,
  notificationWarning,
} from 'features/notification/notificationActions';
import {
  activateOverlayLoader,
  deactivateOverlayLoader,
} from 'features/overlayLoader/overlayLoaderActions';

import { getOAuthToken, setOAuthToken, removeOAuthToken, isUnauthError } from './authUtils';

import * as actionTypes from './authActionTypes';

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
    type: actionTypes.AUTH_REPOSTS_SET,
    payload: {
      reposts,
    },
  };
}

export function setFavorites(favorites) {
  return {
    type: actionTypes.AUTH_FAVORITES_SET,
    payload: {
      favorites,
    },
  };
}

export function setMe(me) {
  return {
    type: actionTypes.AUTH_USER_ME_SET,
    payload: {
      me,
    },
  };
}

export function loginSucceed() {
  return {
    type: actionTypes.AUTH_USER_LOGIN_SUCCEEDED,
  };
}

export function logoutSucceed() {
  return { type: actionTypes.AUTH_USER_LOGOUT_SUCCEEDED };
}

export function setSession(session) {
  return { type: actionTypes.AUTH_SESSION_SET, payload: session };
}

export function startLogin() {
  return {
    type: actionTypes.AUTH_USER_LOGIN_STARTED,
  };
}

export function loginFailed(error) {
  return {
    type: actionTypes.AUTH_USER_LOGIN_FAILED,
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
    type: actionTypes.AUTH_FAVORITES_ADD,
    payload: trackId,
  };
}

export function removeFromFavorites(trackId) {
  return {
    type: actionTypes.AUTH_FAVORITES_REMOVE,
    payload: trackId,
  };
}

export function addToReposts(trackId) {
  return {
    type: actionTypes.AUTH_REPOSTS_ADD,
    payload: {
      trackId,
    },
  };
}

export function removeFromReposts(trackId) {
  return {
    type: actionTypes.AUTH_REPOSTS_REMOVE,
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
        dispatch(deactivateOverlayLoader());
        dispatch(notificationSuccess('Login Success'));
      })
      .catch((err) => {
        console.error(err);
        dispatch(loginFailed(err));
        dispatch(notificationWarning('Failed to login to SoundCloud'));
      });
}

export function doLogin() {
  return (dispatch) => {
    dispatch(startLogin());
    dispatch(activateOverlayLoader('Authenticating...'));
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
      dispatch(activateOverlayLoader('Authenticating...'));

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
        dispatch(notificationSuccess('Track Added To Your Favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to like track: ', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin With SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed To Add Track To Favorites'));
        }
      });
  };
}

export function doUnlikeTrack(trackId) {
  return (dispatch) => {
    unlikeTrack(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track Removed From Your Favorites'));
        dispatch(syncFavorites());
      })
      .catch((err) => {
        console.log('Failed to remove this track from favorites', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin With SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed To Remove Track From Favorites'));
        }
      });
  };
}

export function createRepost(trackId) {
  return (dispatch) => {
    repost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track Successfully Reposted'));
        dispatch(syncReposts());
      })
      .catch((err) => {
        console.log('Failed to create repost', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin with SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed To Create Repost'));
        }
      });
  };
}

export function removeRepost(trackId) {
  return (dispatch) => {
    deleteRepost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track Removed From Reposts'));
        dispatch(syncReposts());
      })
      .catch((err) => {
        console.log('Failed to remove repost', err);
        if (isUnauthError(err)) {
          dispatch(notificationWarning('Please Signin With SoundCloud'));
        } else {
          dispatch(notificationWarning('Failed To Remove Repost'));
        }
      });
  };
}
