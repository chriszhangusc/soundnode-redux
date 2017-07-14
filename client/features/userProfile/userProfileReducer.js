import * as types from './userProfileActionTypes';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
  // pageFetching: false,
  userId: null,
  trackIds: [],
  tracksNextHref: null,
};

export function startFetchingProfiledUser(state) {
  return {
    ...state,
    userFetching: true,
  };
}

export function stopFetchingProfiledUser(state) {
  return {
    ...state,
    userFetching: false,
  };
}

export function updateProfiledUserId(state, { userId }) {
  return {
    ...state,
    userId,
  };
}

export function startFetchingUserTracks(state) {
  return {
    ...state,
    tracksFetching: true,
  };
}

export function stopFetchingUserTracks(state) {
  return {
    ...state,
    tracksFetching: false,
  };
}

export function updateUserTracksNextHref(state, { nextHref }) {
  return {
    ...state,
    tracksNextHref: nextHref,
  };
}

export function resetUserProfileState(initState) {
  return {
    ...initState,
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_PROFILE_STATE_RESET:
      return resetUserProfileState(initialState);

    case types.USER_PROFILE_USER_FETCH_START:
      return startFetchingProfiledUser(state);

    case types.USER_PROFILE_USER_FETCH_STOP:
      return stopFetchingProfiledUser(state);

    case types.USER_PROFILE_USER_UPDATE:
      return updateProfiledUserId(state, action.payload);

    case types.USER_PROFILE_TRACKS_FETCH_START:
      return startFetchingUserTracks(state);

    case types.USER_PROFILE_TRACKS_FETCH_STOP:
      return stopFetchingUserTracks(state);

    case types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE:
      return updateUserTracksNextHref(state, action.payload);

    default:
      return state;
  }
}
