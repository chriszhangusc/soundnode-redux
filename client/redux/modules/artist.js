/* artist module */
import { fetchArtist, fetchArtistTracks, fetchMoreArtistTracks } from 'client/api/sc/v1';
import { fromJS } from 'immutable';
import { notificationFailure } from './notification';
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
      return state.merge({ artistId: action.payload.result, artistFetching: false });
    case TRACKS_REQUEST:
      return state.set('tracksFetching', true);
    case TRACKS_RECEIVED:
      return state.merge({
        trackIds: state
          .get('trackIds')
          .concat(fromJS(action.payload.result)), // concat for scroll to load more
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

/* Action Creators*/
export function clearArtistState() {
  return ({
    type: CLEAR_STATE,
  });
}

export function artistRequest() {
  return { type: ARTIST_REQUEST };
}

export function artistReceived(normalized) {
  return { type: ARTIST_RECEIVED, payload: normalized, entities: normalized.entities };
}

export function artistTracksRequest() {
  return { type: TRACKS_REQUEST };
}

export function artistTracksReceived(normalizedResponse) {
  return { type: TRACKS_RECEIVED, payload: normalizedResponse, entities: normalizedResponse.entities };
}

export function artistFailure() {
  return { type: ARTIST_FAILURE };
}

export function loadArtistPage(artistId) {
  return async (dispatch) => {
    try {
      dispatch(artistRequest());
      dispatch(artistTracksRequest());
      const [artist,
        tracks] = await Promise.all([fetchArtist(artistId), fetchArtistTracks(artistId)]);
      // throw new Error('Fail to fetch resource.');
      dispatch(artistReceived(artist));
      dispatch(artistTracksReceived(tracks));
    } catch (err) {
      // Do we need to stop spinner here ? dispatch(artistFailure(err.message));
      dispatch(notificationFailure(err.message));
    }
  };
}

export function loadMoreArtistTracks() {
  return async (dispatch, getState) => {
    const state = getState();
    // nextHref will be undefined if end has been reached
    const nextHref = getArtistTracksNextHref(state);
    if (nextHref) {
      try {
        dispatch(artistTracksRequest());
        const tracks = await fetchMoreArtistTracks(nextHref);
        dispatch(artistTracksReceived(tracks));
      } catch (err) {
        dispatch(notificationFailure(err.message));
      }
    }
  };
}
