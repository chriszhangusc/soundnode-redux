import SC from 'soundcloud';
import {
  notificationSuccess,
  notificationWarning,
  defaultWarning,
} from 'features/notification/notificationActions';
import {
  showLoadingOverlay,
  hideLoadingOverlay,
} from 'features/loadingOverlay/loadingOverlayActions';

import { getOAuthToken, setOAuthToken, removeOAuthToken } from './authUtils';

import * as types from './authActionTypes';

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
    type: types.AUTH_REPOSTS_UPDATE,
    payload: {
      reposts,
    },
  };
}

export function setFavorites(favorites) {
  return {
    type: types.AUTH_FAVORITES_UPDATE,
    payload: {
      favorites,
    },
  };
}

export function setMe(me) {
  return {
    type: types.AUTH_USER_UPDATE,
    payload: {
      me,
    },
  };
}

export function loginSucceed() {
  return {
    type: types.AUTH_USER_LOGIN_SUCCEEDED,
  };
}

export function logoutSucceed() {
  return { type: types.AUTH_USER_LOGOUT_SUCCEEDED };
}

export function setSession(session) {
  return { type: types.AUTH_SESSION_SET, payload: session };
}

export function startLogin() {
  return {
    type: types.AUTH_USER_LOGIN_STARTED,
  };
}

export function loginFailed(error) {
  return {
    type: types.AUTH_USER_LOGIN_FAILED,
    error,
  };
}

export function syncFavorites() {
  return dispatch =>
    fetchMyFavoritesIds()
      .then(favorites => {
        dispatch(setFavorites(favorites));
      })
      .catch(err => {
        console.log(err);
        dispatch(defaultWarning());
      });
}

export function syncReposts() {
  return dispatch =>
    fetchMyRepostIds()
      .then(reposts => {
        dispatch(setReposts(reposts));
      })
      .catch(err => {
        console.log(err);
        dispatch(defaultWarning());
      });
}

export function addToFavorites(trackId) {
  return {
    type: types.AUTH_FAVORITES_ADD,
    payload: trackId,
  };
}

export function removeFromFavorites(trackId) {
  return {
    type: types.AUTH_FAVORITES_REMOVE,
    payload: trackId,
  };
}

export function addToReposts(trackId) {
  return {
    type: types.AUTH_REPOSTS_ADD,
    payload: {
      trackId,
    },
  };
}

export function removeFromReposts(trackId) {
  return {
    type: types.AUTH_REPOSTS_REMOVE,
    payload: {
      trackId,
    },
  };
}

export function doAuth() {
  return dispatch =>
    SC.connect()
      .then(session => {
        // Initialize Session
        dispatch(setSession(session));
        // Set OAuthToken
        setOAuthToken(session.oauth_token);
      })
      .catch(err => {
        console.log(err);
        dispatch(defaultWarning());
      });
}

// Load everything about me, favorites, reposts...
export function loadMe() {
  // return dispatch => ;
  return dispatch =>
    fetchMe()
      .then(me => {
        dispatch(setMe(me));
        return Promise.all([dispatch(syncFavorites()), dispatch(syncReposts())]);
      })
      .then(() => {
        dispatch(loginSucceed());
        dispatch(hideLoadingOverlay());
        // dispatch(notificationSuccess('Login Success'));
      })
      .catch(err => {
        console.error(err);
        dispatch(loginFailed(err));
        dispatch(notificationWarning('Failed to login to soundcloud'));
      });
}

export function doLogin() {
  return dispatch => {
    dispatch(startLogin());
    dispatch(showLoadingOverlay('Authenticating...'));
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
      dispatch(showLoadingOverlay('Authenticating...'));
      dispatch(loadMe());
    }
  };
}

export function doLogout() {
  return dispatch => {
    removeOAuthToken();
    dispatch(logoutSucceed());
    dispatch(notificationSuccess('Logout success'));
  };
}

export function doLikeTrack(trackId) {
  return dispatch => {
    likeTrack(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track added to favorites'));
        dispatch(syncFavorites());
      })
      .catch(err => {
        console.log('Failed to like track: ', err);
        dispatch(defaultWarning());
      });
  };
}

export function doUnlikeTrack(trackId) {
  return dispatch => {
    unlikeTrack(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track removed from favorites'));
        dispatch(syncFavorites());
      })
      .catch(err => {
        console.log('Failed to remove this track from favorites', err);
        dispatch(defaultWarning());
      });
  };
}

export function createRepost(trackId) {
  return dispatch => {
    repost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track added to reposts'));
        dispatch(syncReposts());
      })
      .catch(err => {
        console.log('Failed to create repost', err);
        dispatch(defaultWarning());
      });
  };
}

export function removeRepost(trackId) {
  return dispatch => {
    deleteRepost(trackId)
      .then(() => {
        dispatch(notificationSuccess('Track removed from reposts'));
        dispatch(syncReposts());
      })
      .catch(err => {
        console.log('Failed to remove repost', err);
        dispatch(defaultWarning());
      });
  };
}
