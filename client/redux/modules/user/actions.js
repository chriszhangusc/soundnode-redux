import { fetchUser, fetchUserTracks, fetchMoreUserTracks } from 'client/api/sc/v1';
import { notificationFailure } from 'client/redux/modules/notification';

import {
  USER_STATE_CLEAR,
  USER_REQUEST,
  USER_RECEIVE,
  USER_FETCH_FAIL,
  USER_TRACKS_REQUEST,
  USER_TRACKS_RECEIVE,
  USER_TRACKS_FETCH_FAIL,
} from './action-types';

import { getUserTracksNextHref } from './selectors';

/* Action Creators*/
export function clearUserState() {
  return ({
    type: USER_STATE_CLEAR,
  });
}

export function requestUser() {
  return { type: USER_REQUEST };
}

export function receiveUser(normalized) {
  return { type: USER_RECEIVE, payload: normalized, entities: normalized.entities };
}

export function requestUserTracks() {
  return { type: USER_TRACKS_REQUEST };
}

export function receiveUserTracks(normalizedResponse) {
  return {
    type: USER_TRACKS_RECEIVE,
    payload: normalizedResponse,
    entities: normalizedResponse.entities,
  };
}

export function handleUserFetchFail() {
  return { type: USER_FETCH_FAIL };
}

// Should load user first and then the tracks
export function loadUserProfilePage(userId) {
  return async (dispatch) => {
    try {
      dispatch(requestUser());
      dispatch(requestUserTracks());
      const [user,
        userTracks] = await Promise.all([fetchUser(userId), fetchUserTracks(userId)]);
      // throw new Error('Fail to fetch resource.');
      dispatch(receiveUser(user));
      dispatch(receiveUserTracks(userTracks));
    } catch (err) {
      // Do we need to stop spinner here ? dispatch(artistFailure(err.message));
console.log(err);
      dispatch(notificationFailure(err.message));
    }
  };
}

// This function is broken
export function loadMoreUserTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    // nextHref will be undefined if end has been reached
    const nextHref = getUserTracksNextHref(state);
    if (nextHref) {
      try {
        dispatch(requestUserTracks());
        const tracks = await fetchMoreUserTracks(nextHref);
        dispatch(receiveUserTracks(tracks));
      } catch (err) {
        dispatch(notificationFailure(err.message));
      }
    }
  };
}
