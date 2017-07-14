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

export function startFetchingUser(state) {
  return {
    ...state,
    userFetching: true,
  };
}

export function stopFetchingUser(state) {
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

export function startFetchingTracks(state) {
  return {
    ...state,
    tracksFetching: true,
  };
}

export function stopFetchingTracks(state) {
  return {
    ...state,
    tracksFetching: false,
  };
}

export function updateTracksNextHref(state, { nextHref }) {
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
      return startFetchingUser(state);

    case types.USER_PROFILE_USER_FETCH_STOP:
      return stopFetchingUser(state);

    case types.USER_PROFILE_USER_UPDATE:
      return updateProfiledUserId(state, action.payload);

    case types.USER_PROFILE_TRACKS_FETCH_START:
      return startFetchingTracks(state);

    case types.USER_PROFILE_TRACKS_FETCH_STOP:
      return stopFetchingTracks(state);

    case types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE:
      return updateTracksNextHref(state, action.payload);

    default:
      return state;
  }
}
