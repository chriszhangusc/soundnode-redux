import { fromJS } from 'immutable';
import { trackSchema, commentArraySchema, trackArraySchema } from 'client/schemas';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import {
  TRACK_REQUEST,
  TRACK_RECEIVE,
  TRACK_FAILURE,
  TRACKS_REQUEST,
  TRACKS_RECEIVE,
  TRACKS_FAILURE,
  TRACK_COMMENTS_REQUEST,
  TRACK_COMMENTS_RECEIVE,
  TRACK_COMMENTS_FAILURE
} from 'client/constants/ActionTypes';

/* Actions */
export const fetchTracks = trackIds => ({
  [CALL_API]: {
    endpoint: '/sc/api-v1/tracks',
    method: 'post',
    data: {
      trackIds: [...trackIds]
    },
    types: [TRACKS_REQUEST, TRACKS_RECEIVE, TRACKS_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchTrack = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}`,
    method: 'GET',
    types: [TRACK_REQUEST, TRACK_RECEIVE, TRACK_FAILURE],
    schema: trackSchema
  }
});

export const fetchComments = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}/comments`,
    method: 'GET',
    query: {
      limit: 20
    },
    types: [TRACK_COMMENTS_REQUEST, TRACK_COMMENTS_RECEIVE, TRACK_COMMENTS_FAILURE],
    schema: commentArraySchema
  }
});

export const loadTrackPage = trackId => (dispatch) => {
  dispatch(fetchTrack(trackId));
  dispatch(fetchComments(trackId));
};

/* Reducer */

const INITIAL_STATE = fromJS({
  trackFetching: false,
  commentsFetching: false,
  trackId: undefined,
  commentIds: [],
  commentsNextHref: null
});

const track = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_REQUEST:
      return state.set('trackFetching', true);
    case TRACK_RECEIVE:
      return state.merge({
        trackId: action.payload.result,
        trackFetching: false
      });
    case TRACK_COMMENTS_REQUEST:
      return state.set('commentsFetching', true);
    case TRACK_COMMENTS_RECEIVE:
      return state.merge({
        commentIds: state.get('commentIds').concat(fromJS(action.payload.result)),
        commentsFetching: false
      });
    default:
      return state;
  }
};
export default track;

/* State Selectors */
export const isTrackFetching = state => state.get('trackFetching');
export const isCommentsFetching = state => state.get('commentsFetching');
export const getTrackId = state => state.get('trackId');
export const getCommentIds = state => state.get('commentIds');
