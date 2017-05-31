import {
  fetchFavoriteTrackIds,
  likeTrack,
  dislikeTrack,
  fetchMeByToken,
} from 'client/common/api/sc/v1';
import {
  notificationRequireLogin,
  notificationLoginSuccess,
  notificationLoginFailed,
  notificationDislikeSuccess,
  notificationLikeSuccess,
} from 'client/features/notification/notificationActions';
import {
  AUTH_USER_LOGIN_SUCCESS,
  AUTH_USER_LOGOUT,
  OAUTH_TOKEN,
  SET_OAUTH_TOKEN,
  SET_FAVORITE_TRACK_IDS,
} from './authConsts';
import { isLoggedIn, getMyId } from './authSelectors';

export function loginSuccess(me) {
  return {
    type: AUTH_USER_LOGIN_SUCCESS,
    payload: me,
  };
}

export function setFavoriteTrackIds(trackIds) {
  return {
    type: SET_FAVORITE_TRACK_IDS,
    payload: trackIds,
  };
}

// http://api.soundcloud.com/users/250047142/favorites?linked_partitioning=1&limit=20&offset=0&oauth_token=1-136957-250047142-032114f80b26f
export function fetchFavorites(userId) {
  return (dispatch) => {
    fetchFavoriteTrackIds(userId).then((trackIds) => {
      dispatch(setFavoriteTrackIds(trackIds));
    });
  };
}

export function fetchMe(session) {
  return (dispatch) => {
    fetchMeByToken(session.oauth_token)
      .then(response => response.json())
      .then((me) => {
        dispatch(fetchFavorites(me.id));
        dispatch(loginSuccess(me));
        dispatch(notificationLoginSuccess());
      })
      .catch((err) => {
        dispatch(notificationLoginFailed());
        console.log('Login Error', err);
      });
  };
}

export function setOAuthToken(token) {
  return {
    type: SET_OAUTH_TOKEN,
    payload: token,
  };
}

export function doLogin() {
  return (dispatch) => {
    // SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });
    // SC is defined in global scope
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      // console.log(session);
      sessionStorage.setItem(OAUTH_TOKEN, session.oauth_token);
      dispatch(setOAuthToken(session.oauth_token));
      // dispatch(fetchUser());
    });
  };
}

export function doLogout() {
  return { type: AUTH_USER_LOGOUT };
}

export function doLikeTrack(trackId) {
  return (dispatch, getState) => {
    const state = getState();
    const loggedIn = isLoggedIn(state);
    if (loggedIn) {
      const userId = getMyId(state);
      likeTrack(userId, trackId)
        .then(() => {
          dispatch(notificationLikeSuccess());
          // Update user favorite list after liking a track
          dispatch(fetchFavorites(userId));
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
      const userId = getMyId(state);
      dislikeTrack(userId, trackId)
        .then(() => {
          dispatch(notificationDislikeSuccess());
          // Update user favorite list after liking a track
          dispatch(fetchFavorites(userId));
        })
        .catch((err) => {
          console.log('Failed to add this track to favorite list', err);
        });
    } else {
      dispatch(notificationRequireLogin());
    }
  };
}
