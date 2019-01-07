import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from './trackProfileActionTypes';

const initialState = {
  trackFetching: false,
  commentsFetching: false,
  trackId: null,
  commentIds: [],
  commentsNextHref: null,
};

export function startFetchingProfiledTrack(state) {
  return {
    ...state,
    trackFetching: true,
  };
}

export function stopFetchingProfiledTrack(state) {
  return {
    ...state,
    trackFetching: false,
  };
}

export function updateProfiledTrack(state, { trackId }) {
  return {
    ...state,
    trackId,
  };
}

export function startFetchingComments(state) {
  return {
    ...state,
    commentsFetching: true,
  };
}

export function stopFetchingComments(state) {
  return {
    ...state,
    commentsFetching: false,
  };
}

export function appendComments(state, { commentIds }) {
  return {
    ...state,
    commentIds: [...state.commentIds, ...commentIds],
  };
}

export function updateCommentsNextHref(state, { commentsNextHref }) {
  return {
    ...state,
    commentsNextHref,
  };
}

export function resetTrackProfileState() {
  return {
    ...initialState,
  };
}

export default createReducer(initialState, {
  [types.TRACK_PROFILE_TRACK_FETCH_START]: startFetchingProfiledTrack,
  [types.TRACK_PROFILE_TRACK_FETCH_STOP]: stopFetchingProfiledTrack,
  [types.TRACK_PROFILE_TRACK_UPDATE]: updateProfiledTrack,
  [types.TRACK_PROFILE_COMMENTS_FETCH_START]: startFetchingComments,
  [types.TRACK_PROFILE_COMMENTS_FETCH_STOP]: stopFetchingComments,
  [types.TRACK_PROFILE_COMMENTS_APPEND]: appendComments,
  [types.TRACK_PROFILE_COMMENTS_NEXT_HREF_UPDATE]: updateCommentsNextHref,
  [types.TRACK_PROFILE_STATE_RESET]: resetTrackProfileState,
});
