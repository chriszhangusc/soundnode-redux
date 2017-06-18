import {
  TRACK_PROFILE_STATE_CLEAR,
  TRACK_PROFILE_TRACK_REQUEST,
  TRACK_PROFILE_TRACK_RECEIVED,
  TRACK_PROFILE_COMMENTS_REQUEST,
  TRACK_PROFILE_COMMENTS_RECEIVED,
} from './trackProfileConsts';

const initialState = {
  trackFetching: false,
  commentsFetching: false,
  trackId: null,
  commentIds: [],
  commentsNextHref: null,
};

export function requestProfiledTrack(state) {
  return {
    ...state,
    trackFetching: true,
  };
}

export function updateProfiledTrack(state, { trackId }) {
  return {
    ...state,
    trackFetching: false,
    trackId,
  };
}

export function requestProfiledTrackComments(state) {
  return {
    ...state,
    commentsFetching: true,
  };
}

export function updateProfiledTrackComments(state, { commentIds, nextHref }) {
  return {
    ...state,
    commentsFetching: false,
    commentIds: [...state.commentIds, ...commentIds],
    commentsNextHref: nextHref,
  };
}

export default function track(state = initialState, action) {
  switch (action.type) {
    case TRACK_PROFILE_STATE_CLEAR:
      return {
        ...initialState,
      };

    case TRACK_PROFILE_TRACK_REQUEST:
      return requestProfiledTrack(state);

    case TRACK_PROFILE_TRACK_RECEIVED:
      return updateProfiledTrack(state, action.payload);

    case TRACK_PROFILE_COMMENTS_REQUEST:
      return requestProfiledTrackComments(state);

    case TRACK_PROFILE_COMMENTS_RECEIVED:
      return updateProfiledTrackComments(state, action.payload);

    default:
      return state;
  }
}
