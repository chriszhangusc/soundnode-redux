/* artist module */
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { artistSchema, trackArraySchema } from 'client/schemas';
import {
  ARTIST_REQUEST,
  ARTIST_RECEIVE,
  ARTIST_FAILURE,
  ARTIST_TRACKS_REQUEST,
  ARTIST_TRACKS_RECEIVE,
  ARTIST_TRACKS_FAILURE,
  CLEAR_ARTIST_STATE
} from 'client/constants/ActionTypes';

/* Actions */
const fetchArtist = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}`,
    fetchOptions: {
      method: 'GET'
    },
    types: [ARTIST_REQUEST, ARTIST_RECEIVE, ARTIST_FAILURE],
    schema: artistSchema
  }
});

const fetchArtistTracks = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}/tracks`,
    fetchOptions: {
      method: 'GET'
    },
    query: {
      limit: 20
    },
    method: 'GET',
    types: [ARTIST_TRACKS_REQUEST, ARTIST_TRACKS_RECEIVE, ARTIST_TRACKS_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchArtistAndTracks = id => (dispatch) => {
  dispatch(fetchArtist(id));
  dispatch(fetchArtistTracks(id));
};

export const clearArtistState = () => ({
  type: CLEAR_ARTIST_STATE
});

/* Reducer */
const INITIAL_STATE = fromJS({
  artistFetching: false,
  tracksFetching: false,
  artistId: undefined,
  trackIds: [],
  tracksNextHref: undefined
});

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_ARTIST_STATE:
      return INITIAL_STATE;
    case ARTIST_REQUEST:
      return state.set('artistFetching', true);
    case ARTIST_RECEIVE:
      return state.merge({
        artistId: action.payload.result,
        artistFetching: false
      });
    case ARTIST_TRACKS_REQUEST:
      return state.set('tracksFetching', true);
    case ARTIST_TRACKS_RECEIVE:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result)), // concat for scroll to load more
        tracksFetching: false
      });
    default:
      return state;
  }
};
export const getArtistId = state => state.get('artistId');
export const getTrackIds = state => state.get('trackIds');
export const isArtistFetching = state => state.get('artistFetching');
export const isTracksFetching = state => state.get('tracksFetching');
export const getTracksNextHref = state => state.get('tracksNextHref');

export default artist;
