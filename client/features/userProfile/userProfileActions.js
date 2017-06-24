import { mergeEntities } from 'client/features/entities/entitiesActions';
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
    type: types.USER_PROFILE_STATE_RESET,
  };
}

export function startFetchingProfiledUser() {
  return { type: types.USER_PROFILE_USER_FETCH_START };
}

export function stopFetchingProfiledUser() {
  return { type: types.USER_PROFILE_USER_FETCH_STOP };
}

export function updateProfiledUser(userId) {
  return {
    type: types.USER_PROFILE_USER_UPDATE,
    payload: {
      userId,
    },
  };
}

export function failedToFetchUser() {
  return { type: types.USER_PROFILE_USER_FAIL };
}

export function startFetchingUserTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_START };
}

export function stopFetchingUserTracks() {
  return { type: types.USER_PROFILE_TRACKS_FETCH_STOP };
}

export function appendUserTracks(trackIds) {
  return {
    type: types.USER_PROFILE_TRACKS_APPEND,
    payload: {
      trackIds,
    },
  };
}

export function updateUserTracksNextHref(nextHref) {
  return {
    type: types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE,
    payload: {
      nextHref,
    },
  };
}

export function failedToFetchUserTracks() {
  return {
    type: types.USER_PROFILE_TRACKS_FAIL,
  };
}

// Should load user first and then the tracks
export function loadUserProfilePage(userId) {
  return async (dispatch) => {
    try {
      dispatch(startFetchingProfiledUser());
      dispatch(startFetchingUserTracks());
      // No need to group them together
      const [normalizedUser, normalizedTracks] = await Promise.all([
        fetchProfiledUser(userId),
        fetchProfiledUserTracks(userId),
      ]);

      dispatch(mergeEntities(normalizedUser.entities));
      dispatch(mergeEntities(normalizedTracks.entities));

      dispatch(updateProfiledUser(normalizedUser.result));

      dispatch(appendUserTracks(normalizedTracks.result));
      dispatch(updateUserTracksNextHref(normalizedTracks.nextHref));

      dispatch(stopFetchingProfiledUser());
      dispatch(stopFetchingUserTracks());
    } catch (err) {
      // Do we need to stop spinner here ? dispatch(artistFailure(err.message));
      console.log(err);
      // dispatch(failedToFetchUserTracks());
      // dispatch(failedToFetchUser());
    }
  };
}

export function loadMoreUserTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    const fetching = isUserTracksFetching(state);

    // nextHref will be undefined if there is no more data to fetch
    const curNextHref = getUserTracksNextHref(state);
    // console.log('NextHref:', nextHref);
    if (!fetching && curNextHref) {
      try {
        dispatch(startFetchingUserTracks());
        const { entities, result, nextHref } = await fetchMoreProfiledUserTracks(curNextHref);
        dispatch(mergeEntities(entities));
        dispatch(appendUserTracks(result));
        dispatch(updateUserTracksNextHref(nextHref));
        dispatch(stopFetchingUserTracks());
      } catch (err) {
        console.log(err);
        // dispatch(failedToFetchUserTracks());
      }
    }
  };
}
