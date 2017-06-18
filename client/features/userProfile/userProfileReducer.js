import uniq from 'lodash/uniq';
import {
  USER_PROFILE_STATE_CLEAR,
  USER_PROFILE_USER_REQUEST,
  USER_PROFILE_USER_RECEIVED,
  USER_PROFILE_USER_FAILED,
  USER_PROFILE_TRACKS_REQUEST,
  USER_PROFILE_TRACKS_RECEIVED,
  USER_PROFILE_TRACKS_FAILED,
} from './userProfileConsts';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
  userId: null,
  trackIds: [],
  tracksNextHref: null,
};

export function requestProfiledUser(state) {
  return {
    ...state,
    userFetching: true,
  };
}

export function updateProfiledUser(state, { userId }) {
  return {
    ...state,
    userId,
    userFetching: false,
  };
}

export function endProfiledUserRequest(state) {
  return {
    ...state,
    userFetching: true,
  };
}

export function startProfiledUserTracksRequest(state) {
  return {
    ...state,
    tracksFetching: true,
  };
}

export function endProfiledUserTracksRequest(state) {
  return {
    ...state,
    tracksFetching: false,
  };
}

export function updateProfiledUserTracks(state, { trackIds, nextHref }) {
  return {
    ...state,
    // There will be overlap in the data from SoundCloud
    trackIds: uniq([...state.trackIds, ...trackIds]),
    tracksFetching: false,
    tracksNextHref: nextHref,
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_STATE_CLEAR:
      return {
        ...initialState,
      };

    case USER_PROFILE_USER_REQUEST:
      return requestProfiledUser(state);

    case USER_PROFILE_USER_RECEIVED:
      return updateProfiledUser(state, action.payload);

    case USER_PROFILE_USER_FAILED:
      return endProfiledUserRequest(state);

    case USER_PROFILE_TRACKS_REQUEST:
      return startProfiledUserTracksRequest(state);

    case USER_PROFILE_TRACKS_RECEIVED:
      return updateProfiledUserTracks(state, action.payload);

    case USER_PROFILE_TRACKS_FAILED:
      return endProfiledUserTracksRequest(state);
    default:
      return state;
  }
}
