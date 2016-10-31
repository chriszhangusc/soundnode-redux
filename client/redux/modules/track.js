import { fromJS } from 'immutable';
import { trackSchema, commentArraySchema } from 'client/schemas';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { notificationFailure } from 'client/redux/modules/notification';
import * as v1 from 'client/../api/sc/v1';

/* Constants */
export const TRACK_REQUEST = 'redux-music/track/REQUEST';
export const TRACK_RECEIVED = 'redux-music/track/RECEIVED';
export const TRACK_FAILURE = 'redux-music/track/FAILURE';

export const COMMENTS_REQUEST = 'redux-music/track/COMMENTS_REQUEST';
export const COMMENTS_RECEIVED = 'redux-music/track/COMMENTS_RECEIVED';
export const COMMENTS_FAILURE = 'redux-music/track/COMMENTS_FAILURE';

export const CLEAR_STATE = 'redux-music/track/CLEAR_STATE';

/* Reducer */

const INITIAL_STATE = fromJS({
  trackFetching: false,
  commentsFetching: false,
  trackId: undefined,
  commentIds: [],
  commentsNextHref: undefined,
});

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
        commentIds: state.get('commentIds').concat(fromJS(action.payload.result)),
        commentsFetching: false,
        commentsNextHref: action.payload.nextHref,
      });
    default:
      return state;
  }
}

/* Selectors */
const getTrackState = state => state.get('track');
export const getTrackId = state => getTrackState(state).get('trackId');
export const isTrackFetching = state => getTrackState(state).get('trackFetching');
export const isTrackCommentsFetching = state => getTrackState(state).get('commentsFetching');
export const getTrackCommentIds = state => getTrackState(state).get('commentIds');
export const getTrackCommentsNextHref = state => getTrackState(state).get('commentsNextHref');
/* Actions */
export const clearTrackState = () => ({
  type: CLEAR_STATE,
});

export const fetchTrack = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}`,
    method: 'GET',
    types: [TRACK_REQUEST, TRACK_RECEIVED, TRACK_FAILURE],
    schema: trackSchema,
  },
});

export const fetchComments = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}/comments`,
    method: 'GET',
    query: {
      limit: 20,
    },
    types: [COMMENTS_REQUEST, COMMENTS_RECEIVED, COMMENTS_FAILURE],
    schema: commentArraySchema,
  },
});

export function commentsRequest() {
  return {
    type: COMMENTS_REQUEST,
  };
}

export function commentsReceived(normalizedResponse) {
  return {
    type: COMMENTS_RECEIVED,
    payload: normalizedResponse,
    entities: normalizedResponse.entities,
  };
}

export function trackRequest() {
  return {
    type: TRACK_REQUEST,
  };
}

export function trackReceived(normalizedResponse) {
  return {
    type: TRACK_RECEIVED,
    payload: normalizedResponse,
    entities: normalizedResponse.entities,
  };
}

// IMPROVE: Got lots of nested then, should have been cleaner
export function loadTrackPage(trackId) {
  return (dispatch) => {
    dispatch(trackRequest());
    v1.fetchTrack(trackId)
      .then((trackResponse) => {
        dispatch(trackReceived(trackResponse));
      })
      .then(() => {
        dispatch(commentsRequest());
        v1.fetchTrackComments(trackId)
          .then((commentsResponse) => {
            dispatch(commentsReceived(commentsResponse));
          });
      })
      .catch((err) => {
        // Dispatch error notification
        dispatch(notificationFailure('Failed to load page: ', err));
      });
    // dispatch(fetchTrack(trackId));
    // dispatch(fetchComments(trackId));
  };
}

export function loadMoreComments() {
  return (dispatch, getState) => {
    const state = getState();
    const nextHref = getTrackCommentsNextHref(state);
    dispatch(commentsRequest());
    v1.fetchMoreTrackComments(nextHref)
      .then((commentsResponse) => {
        dispatch(commentsReceived(commentsResponse));
      })
      .catch((err) => {
        // Dispatch error notification
        dispatch(notificationFailure('Failed to load comments: ', err));
      });
  };
}
