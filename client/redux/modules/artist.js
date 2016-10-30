/* artist module */
import * as v1 from 'client/../api/sc/v1';
import { fromJS } from 'immutable';
import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
import { artistSchema } from 'client/schemas';
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
        tracksNextHref: action.payload.nextHref,
      });
    default:
      return state;
  }
}

/* Selectors */
export const getArtistState = state => state.get('artist');
export const getArtistId = state => getArtistState(state).get('artistId');
export const getArtistTrackIds = state => getArtistState(state).get('trackIds');
export const isArtistFetching = state => getArtistState(state).get('artistFetching');
export const isArtistTracksFetching = state => getArtistState(state).get('tracksFetching');
export const getArtistTracksNextHref = state => getArtistState(state).get('tracksNextHref');

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

// export const fetchArtistTracks = id => ({
//   [CALL_API]: {
//     endpoint: `/sc/api-v1/users/${id}/tracks`,
//     fetchOptions: {
//       method: 'GET',
//     },
//     query: {
//       limit: 20,
//     },
//     method: 'GET',
//     types: [TRACKS_REQUEST, TRACKS_RECEIVED, TRACKS_FAILURE],
//     schema: trackArraySchema,
//   },
// });

export function artistTracksRequest() {
  return {
    type: TRACKS_REQUEST,
  };
}

export function artistTracksReceived(normalizedResponse) {
  return {
    type: TRACKS_RECEIVED,
    payload: normalizedResponse,
    entities: normalizedResponse.entities,
  };
}

export function fetchMoreArtistTracks() {
  return (dispatch, getState) => {
    const state = getState();
    // nextHref will be undefined if end has been reached
    const nextHref = getArtistTracksNextHref(state);
    if (nextHref) {
      dispatch(artistTracksRequest());
      v1.fetchMoreArtistTracks(nextHref)
        .then(normalizedResponse => dispatch(artistTracksReceived(normalizedResponse)));
    }
  };
}

export function loadArtistPage(artistId) {
  // Fetch artist and tracks
  return (dispatch) => {
    // v1.fetchArtist(id).then((artistObj) => {
    //   console.log(artistObj);
    // });
    dispatch(fetchArtist(artistId));
    dispatch(artistTracksRequest());
    v1.fetchArtistTracks(artistId)
      .then(normalizedResponse => dispatch(artistTracksReceived(normalizedResponse)));
    // dispatch(fetchArtistTracks(id));
  };
}
