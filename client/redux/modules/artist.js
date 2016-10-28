/* artist module */
import * as v1 from 'client/../api/sc/v1';
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { artistSchema, trackArraySchema } from 'client/schemas';
import { createStructuredSelector } from 'reselect';

/* Constants */
export const CLEAR_STATE = 'redux-music/artist/CLEAR_STATE';
export const ARTIST_REQUEST = 'redux-music/artist/ARTIST_REQUEST';
export const ARTIST_RECEIVED = 'redux-music/artist/ARTIST_RECEIVED';
export const ARTIST_FAILURE = 'redux-music/artist/ARTIST_FAILURE';
export const TRACKS_REQUEST = 'redux-music/artist/TRACKS_REQUEST';
export const TRACKS_RECEIVED = 'redux-music/artist/TRACKS_RECEIVED';
export const TRACKS_FAILURE = 'redux-music/artist/TRACKS_FAILURE';

/* Reducer */
const initialState = fromJS({
  artistFetching: false,
  tracksFetching: false,
  artistId: undefined,
  trackIds: [],
  tracksNextHref: undefined,
});

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case ARTIST_REQUEST:
      return state.set('artistFetching', true);
    case ARTIST_RECEIVED:
      return state.merge({
        artistId: action.payload.result,
        artistFetching: false,
      });
    case TRACKS_REQUEST:
      return state.set('tracksFetching', true);
    case TRACKS_RECEIVED:
      return state.merge({
        trackIds: state.get('trackIds').concat(fromJS(action.payload.result)), // concat for scroll to load more
        tracksFetching: false,
      });
    default:
      return state;
  }
}

/* Selectors */
export const getArtistState = state => state.get('artist');
export const getArtistId = state => getArtistState(state).get('artistId');
export const getTrackIds = state => getArtistState(state).get('trackIds');
export const isArtistFetching = state => getArtistState(state).get('artistFetching');
export const isTracksFetching = state => getArtistState(state).get('tracksFetching');
export const getTracksNextHref = state => getArtistState(state).get('tracksNextHref');

// export const selectors = createStructuredSelector({
//   getArtistId,
//   getTrackIds,
//   isArtistFetching,
//   isTracksFetching,
//   getTracksNextHref,
// });

/* Actions */
export const clearArtistState = () => ({
  type: CLEAR_STATE,
});

export const fetchArtist = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}`,
    fetchOptions: {
      method: 'GET',
    },
    types: [ARTIST_REQUEST, ARTIST_RECEIVED, ARTIST_FAILURE],
    schema: artistSchema,
  },
});

export const fetchArtistTracks = id => ({
  [CALL_API]: {
    endpoint: `/sc/api-v1/users/${id}/tracks`,
    fetchOptions: {
      method: 'GET',
    },
    query: {
      limit: 20,
    },
    method: 'GET',
    types: [TRACKS_REQUEST, TRACKS_RECEIVED, TRACKS_FAILURE],
    schema: trackArraySchema,
  },
});

export function fetchArtistAndTracks(id) {
  return (dispatch) => {
    v1.fetchArtist(id).then((artistObj) => {
      console.log(artistObj);
    });
    dispatch(fetchArtist(id));
    dispatch(fetchArtistTracks(id));
  };
}
