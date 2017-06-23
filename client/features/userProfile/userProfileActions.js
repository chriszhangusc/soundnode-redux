import * as types from './userProfileConsts';

import {
  fetchProfiledUser,
  fetchProfiledUserTracks,
  fetchMoreProfiledUserTracks,
} from './userProfileApi';

import { getUserTracksNextHref, isUserTracksFetching } from './userProfileSelectors';

/* Action Creators*/
export function clearUserState() {
  return {
    type: types.USER_PROFILE_STATE_CLEAR,
  };
}

export function requestUser() {
  return { type: types.USER_PROFILE_USER_REQUEST };
}

export function receiveUser(normalized) {
  return {
    type: types.USER_PROFILE_USER_RECEIVED,
    payload: {
      ...normalized,
      userId: normalized.result,
    },
  };
}

export function failedToFetchUser() {
  return { type: types.USER_PROFILE_USER_FAILED };
}

export function requestUserTracks() {
  return { type: types.USER_PROFILE_TRACKS_REQUEST };
}

export function receiveUserTracks(normalized) {
  return {
    type: types.USER_PROFILE_TRACKS_RECEIVED,
    payload: {
      ...normalized,
      trackIds: normalized.result,
      nextHref: normalized.nextHref,
    },
  };
}

export function failedToFetchUserTracks() {
  return {
    type: types.USER_PROFILE_TRACKS_FAILED,
  };
}

// Should load user first and then the tracks
export function loadUserProfilePage(userId) {
  return async (dispatch) => {
    try {
      dispatch(requestUser());
      dispatch(requestUserTracks());
      const [user, userTracks] = await Promise.all([
        fetchProfiledUser(userId),
        fetchProfiledUserTracks(userId),
      ]);
      dispatch(receiveUser(user));
      dispatch(receiveUserTracks(userTracks));
    } catch (err) {
      // Do we need to stop spinner here ? dispatch(artistFailure(err.message));
      console.log(err);
      dispatch(failedToFetchUserTracks());
      dispatch(failedToFetchUser());
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
        const tracks = await fetchMoreProfiledUserTracks(nextHref);
        dispatch(receiveUserTracks(tracks));
      } catch (err) {
        console.log(err);
        dispatch(failedToFetchUserTracks());
      }
    }
  };
}
