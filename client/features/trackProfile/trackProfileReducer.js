import * as types from './trackProfileConsts';

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

export function resetTrackProfileState(initState) {
  return {
    ...initState,
  };
}

export default function track(state = initialState, action) {
  switch (action.type) {
    case types.TRACK_PROFILE_TRACK_FETCH_START:
      return startFetchingProfiledTrack(state);

    case types.TRACK_PROFILE_TRACK_FETCH_STOP:
      return stopFetchingProfiledTrack(state);

    case types.TRACK_PROFILE_TRACK_UPDATE:
      return updateProfiledTrack(state, action.payload);

    case types.TRACK_PROFILE_COMMENTS_FETCH_START:
      return startFetchingComments(state);

    case types.TRACK_PROFILE_COMMENTS_FETCH_STOP:
      return stopFetchingComments(state);

    case types.TRACK_PROFILE_COMMENTS_APPEND:
      return appendComments(state, action.payload);

    case types.TRACK_PROFILE_COMMENTS_NEXT_HREF_UPDATE:
      return updateCommentsNextHref(state, action.payload);

    case types.TRACK_PROFILE_STATE_RESET:
      return resetTrackProfileState(initialState);

    default:
      return state;
  }
}
