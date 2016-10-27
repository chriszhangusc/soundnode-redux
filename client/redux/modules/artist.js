/* artist module */
import * as v1 from 'client/../api/sc/v1';
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { artistSchema, trackArraySchema } from 'client/schemas';

/* Constants */
export const CLEAR_STATE = 'redux-music/artist/CLEAR_STATE';
export const ARTIST_REQUEST = 'redux-music/artist/ARTIST_REQUEST';
export const ARTIST_RECEIVED = 'redux-music/artist/ARTIST_RECEIVED';
export const ARTIST_FAILURE = 'redux-music/artist/ARTIST_FAILURE';
export const TRACKS_REQUEST = 'redux-music/artist/TRACKS_REQUEST';
export const TRACKS_RECEIVED = 'redux-music/artist/TRACKS_RECEIVED';
export const TRACKS_FAILURE = 'redux-music/artist/TRACKS_FAILURE';

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
    case CLEAR_STATE:
      return INITIAL_STATE;
    case ARTIST_REQUEST:
      return state.set('artistFetching', true);
    case ARTIST_RECEIVED:
      return state.merge({
        artistId: action.payload.result,
        artistFetching: false
      });
    case TRACKS_REQUEST:
      return state.set('tracksFetching', true);
    case TRACKS_RECEIVED:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result)), // concat for scroll to load more
        tracksFetching: false
      });
    default:
      return state;
  }
};

export default artist;

/* Selectors */
export const getState = state => state.get('artist');
export const getArtistId = state => getState(state).get('artistId');
export const getTrackIds = state => getState(state).get('trackIds');
export const isArtistFetching = state => getState(state).get('artistFetching');
export const isTracksFetching = state => getState(state).get('tracksFetching');
export const getTracksNextHref = state => getState(state).get('tracksNextHref');


/* Actions */
const fetchArtist = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}`,
    fetchOptions: {
      method: 'GET'
    },
    types: [ARTIST_REQUEST, ARTIST_RECEIVED, ARTIST_FAILURE],
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
    types: [TRACKS_REQUEST, TRACKS_RECEIVED, TRACKS_FAILURE],
    schema: trackArraySchema
  }
});

export const fetchArtistAndTracks = id => (dispatch) => {
  v1.fetchArtist(id).then((artistObj) => {
    console.log(artistObj);
  });
  dispatch(fetchArtist(id));
  dispatch(fetchArtistTracks(id));
};

export const clearArtistState = () => ({
  type: CLEAR_STATE
});
