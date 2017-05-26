import { fetchUser, fetchUserTracks, fetchMoreUserTracks } from 'client/common/api/sc/v1';
import { notificationFailure } from 'client/features/notification';

import {
  USER_STATE_CLEAR,
  USER_REQUEST,
  USER_RECEIVE,
  USER_FETCH_FAIL,
  USER_TRACKS_REQUEST,
  USER_TRACKS_RECEIVE,
  USER_TRACKS_FETCH_FAIL,
} from './userProfileConsts';

import { getUserTracksNextHref, isUserTracksFetching } from './userProfileSelectors';

/* Action Creators*/
export function clearUserState() {
  return {
    type: USER_STATE_CLEAR,
  };
}

export function requestUser() {
  return { type: USER_REQUEST };
}

export function receiveUser(normalized) {
  return {
    type: USER_RECEIVE,
    payload: normalized,
  };
}

export function requestUserTracks() {
  return { type: USER_TRACKS_REQUEST };
}

export function receiveUserTracks(normalized) {
  return {
    type: USER_TRACKS_RECEIVE,
    payload: normalized,
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
      const [user, userTracks] = await Promise.all([fetchUser(userId), fetchUserTracks(userId)]);
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

export function loadMoreUserTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    const fetching = isUserTracksFetching(state);

    // nextHref will be undefined if there is no more data to fetch
    const nextHref = getUserTracksNextHref(state);
    // console.log('NextHref:', nextHref);
    if (!fetching && nextHref) {
      try {
        dispatch(requestUserTracks());
        const tracks = await fetchMoreUserTracks(nextHref);
        dispatch(receiveUserTracks(tracks));
      } catch (err) {
        console.log(err);
        dispatch(notificationFailure(err.message));
      }
    }
  };
}
