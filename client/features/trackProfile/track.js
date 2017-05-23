import { trackSchema, commentArraySchema } from 'client/app/schema';
import { CALL_API } from 'client/app/middlewares/apiMiddleware';
import { notificationFailure } from 'client/features/notification';
import * as v1 from 'client/common/api/sc/v1';

/* Constants */
export const TRACK_REQUEST = 'redux-music/track/REQUEST';
export const TRACK_RECEIVED = 'redux-music/track/RECEIVED';
export const TRACK_FAILURE = 'redux-music/track/FAILURE';

export const COMMENTS_REQUEST = 'redux-music/track/COMMENTS_REQUEST';
export const COMMENTS_RECEIVED = 'redux-music/track/COMMENTS_RECEIVED';
export const COMMENTS_FAILURE = 'redux-music/track/COMMENTS_FAILURE';

export const CLEAR_STATE = 'redux-music/track/CLEAR_STATE';

/* Reducer */
const INITIAL_STATE = {
  trackFetching: false,
  commentsFetching: false,
  trackId: null,
  commentIds: [],
  commentsNextHref: null,
};

export default function track(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return INITIAL_STATE;
    case TRACK_REQUEST:
      return state.set('trackFetching', true);
    case TRACK_RECEIVED:
      return state.merge({
        trackId: action.payload.result,
        trackFetching: false,
      });
    case COMMENTS_REQUEST:
      return state.set('commentsFetching', true);
    case COMMENTS_RECEIVED:
      return state.merge({
        commentIds: state.get('commentIds').concat((action.payload.result)),
        commentsFetching: false,
        commentsNextHref: action.payload.nextHref,
      });
    default:
      return state;
  }
}

/* Selectors */
const getTrackState = state => state.track;
export const getTrackId = state => getTrackState(state).trackId;
export const isTrackFetching = state => getTrackState(state).trackFetching;
export const isTrackCommentsFetching = state => getTrackState(state).commentsFetching;
export const getTrackCommentIds = state => getTrackState(state).commentIds;
export const getTrackCommentsNextHref = state => getTrackState(state).commentsNextHref;
