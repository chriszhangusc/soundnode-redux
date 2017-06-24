import uniq from 'lodash/uniq';
import * as types from './userProfileConsts';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
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

export function updateProfiledUser(state, { userId }) {
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

export function appendUserTracks(state, { trackIds }) {
  return {
    ...state,
    // There will be overlap in the data from SoundCloud
    trackIds: uniq([...state.trackIds, ...trackIds]),
  };
}

export function resetProfiledUserState() {
  return {
    ...initialState,
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_PROFILE_STATE_RESET:
      return resetProfiledUserState();

    case types.USER_PROFILE_USER_FETCH_START:
      return startFetchingProfiledUser(state);

    case types.USER_PROFILE_USER_FETCH_STOP:
      return stopFetchingProfiledUser(state);

    case types.USER_PROFILE_USER_UPDATE:
      return updateProfiledUser(state, action.payload);

    // case types.USER_PROFILE_USER_FAIL:
    //   return endProfiledUserRequest(state);

    case types.USER_PROFILE_TRACKS_FETCH_START:
      return startFetchingUserTracks(state);

    case types.USER_PROFILE_TRACKS_FETCH_STOP:
      return stopFetchingUserTracks(state);

    case types.USER_PROFILE_TRACKS_APPEND:
      return appendUserTracks(state, action.payload);

    // case types.USER_PROFILE_TRACKS_FAILED:
    //   return endProfiledUserTracksRequest(state);

    default:
      return state;
  }
}
