/* artist module */
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { artistSchema, trackArraySchema } from 'client/schemas';
/* Artist Action Types */
export const CLEAR_STATE = 'redux-music/artist/CLEAR_STATE';

export const ARTIST_REQUEST = 'redux-music/artist/ARTIST_REQUEST';
export const ARTIST_RECEIVED = 'redux-music/artist/ARTIST_RECEIVED';
export const ARTIST_FAILURE = 'redux-music/artist/ARTIST_FAILURE';

export const TRACKS_REQUEST = 'redux-music/artist/TRACKS_REQUEST';
export const TRACKS_RECEIVED = 'redux-music/artist/TRACKS_RECEIVED';
export const TRACKS_FAILURE = 'redux-music/artist/TRACKS_FAILURE';

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
  dispatch(fetchArtist(id));
  dispatch(fetchArtistTracks(id));
};

export const clearArtistState = () => ({
  type: CLEAR_STATE
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
export const getArtistId = state => state.get('artistId');
export const getTrackIds = state => state.get('trackIds');
export const isArtistFetching = state => state.get('artistFetching');
export const isTracksFetching = state => state.get('tracksFetching');
export const getTracksNextHref = state => state.get('tracksNextHref');

export default artist;
