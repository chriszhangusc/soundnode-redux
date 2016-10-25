import { fromJS } from 'immutable';
import { trackSchema, commentArraySchema } from 'client/schemas';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import * as v1 from 'client/../api/sc/v1';

/* Track Action Types */
export const TRACK_REQUEST = 'redux-music/track/REQUEST';
export const TRACK_RECEIVED = 'redux-music/track/RECEIVED';
export const TRACK_FAILURE = 'redux-music/track/FAILURE';

export const COMMENTS_REQUEST = 'redux-music/track/COMMENTS_REQUEST';
export const COMMENTS_RECEIVED = 'redux-music/track/COMMENTS_RECEIVED';
export const COMMENTS_FAILURE = 'redux-music/track/COMMENTS_FAILURE';

export const CLEAR_STATE = 'redux-music/track/CLEAR_STATE';


/* Actions */
export const clearTrackState = () => ({
  type: CLEAR_STATE
});

export const fetchTrack = trackId => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/tracks/${trackId}`,
    method: 'GET',
    types: [TRACK_REQUEST, TRACK_RECEIVED, TRACK_FAILURE],
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
    types: [COMMENTS_REQUEST, COMMENTS_RECEIVED, COMMENTS_FAILURE],
    schema: commentArraySchema
  }
});

export const loadTrackPage = trackId => (dispatch) => {
  v1.fetchTrack(trackId).then(track => {
    console.log(track);
  }).catch(err => {
    console.log('Something wrong', err);
  });
  // Clear previous state.
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
    case CLEAR_STATE:
      return INITIAL_STATE;
    case TRACK_REQUEST:
      return state.set('trackFetching', true);
    case TRACK_RECEIVED:
      return state.merge({
        trackId: action.payload.result,
        trackFetching: false
      });
    case COMMENTS_REQUEST:
      return state.set('commentsFetching', true);
    case COMMENTS_RECEIVED:
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
