import {
  TRACK_PROFILE_STATE_CLEAR,
  TRACK_PROFILE_TRACK_REQUEST,
  TRACK_PROFILE_TRACK_RECEIVED,
  TRACK_PROFILE_COMMENTS_REQUEST,
  TRACK_PROFILE_COMMENTS_RECEIVED,
} from './trackProfileConsts';

const INITIAL_STATE = {
  trackFetching: false,
  commentsFetching: false,
  trackId: null,
  commentIds: [],
  commentsNextHref: null,
};

export default function track(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRACK_PROFILE_STATE_CLEAR:
      return INITIAL_STATE;
    case TRACK_PROFILE_TRACK_REQUEST:
      return {
        ...state,
        trackFetching: true,
      };
    case TRACK_PROFILE_TRACK_RECEIVED:
      return {
        ...state,
        trackFetching: false,
        trackId: action.payload.result,
      };
    case TRACK_PROFILE_COMMENTS_REQUEST:
      return {
        ...state,
        commentsFetching: true,
      };
    case TRACK_PROFILE_COMMENTS_RECEIVED:
      return {
        ...state,
        commentsFetching: false,
        commentIds: [...state.commentIds, ...action.payload.result],
        commentsNextHref: action.payload.nextHref,
      };

    default:
      return state;
  }
}
