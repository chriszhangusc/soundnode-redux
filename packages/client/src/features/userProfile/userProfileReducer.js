import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import { mergeArrays } from '@soundnode-redux/client/src/common/utils/generalUtils';
import * as types from './userProfileActionTypes';

/* Reducer */
const initialState = {
  userFetching: false,
  tracksFetching: false,
  pageLoading: false,
  userId: null,
  trackIds: [],
  tracksNextHref: null,
};

export function startLoadingPage(state) {
  return {
    ...state,
    pageLoading: true,
  };
}

export function stopLoadingPage(state) {
  return {
    ...state,
    pageLoading: false,
  };
}

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

export function mergeUserTracks(state, { trackIds }) {
  return {
    ...state,
    // mergeArrays removes duplicates while preserving the order.
    trackIds: mergeArrays(state.trackIds, trackIds),
  };
}

export function resetUserProfileState() {
  return {
    ...initialState,
  };
}

export default createReducer(initialState, {
  [types.USER_PROFILE_PAGE_LOADING_START]: startLoadingPage,
  [types.USER_PROFILE_PAGE_LOADING_STOP]: stopLoadingPage,
  [types.USER_PROFILE_STATE_RESET]: resetUserProfileState,
  [types.USER_PROFILE_USER_FETCH_START]: startFetchingUser,
  [types.USER_PROFILE_USER_FETCH_STOP]: stopFetchingUser,
  [types.USER_PROFILE_USER_UPDATE]: updateProfiledUserId,
  [types.USER_PROFILE_TRACKS_FETCH_START]: startFetchingTracks,
  [types.USER_PROFILE_TRACKS_FETCH_STOP]: stopFetchingTracks,
  [types.USER_PROFILE_TRACKS_NEXT_HREF_UPDATE]: updateTracksNextHref,
  [types.USER_PROFILE_TRACKS_MERGE]: mergeUserTracks,
});
