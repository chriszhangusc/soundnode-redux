import { fromJS } from 'immutable';
import Artist from 'client/models/Artist';
import TrackMap from 'client/models/TrackMap';
import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  ARTIST_RECEIVED,
  START_TRACKS_FETCH,
  END_TRACKS_FETCH,
  TRACKS_RECEIVED
} from 'client/constants/ActionTypes';
// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isArtistFetching: false,
  artist: new Artist(),
  trackMap: new TrackMap(),
  trackNextHref: null,
  isTracksFetching: false
});

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_ARTIST_FETCH:
      return state.set('isArtistFetching', true);
    case END_ARTIST_FETCH:
      return state.set('isArtistFetching', false);
    case ARTIST_RECEIVED:
      return state.merge(fromJS({
        artist: action.payload
      })); // action.payload is an instance of Artist.
    case START_TRACKS_FETCH:
      return state.set('isTracksFetching', true);
    case END_TRACKS_FETCH:
      return state.set('isTracksFetching', false);
    case TRACKS_RECEIVED:
    // Is merge gonna addon or override.
      return state.merge({
        trackMap: action.payload.trackMap,
        trackNextHref: action.payload.trackNextHref
      });
    default:
      return state;
  }
};

export const getArtistRecord = state => state.get('artist');
export const getArtistTrackMap = state => state.get('trackMap');
export const getIsArtistFetching = state => state.get('isArtistFetching');
export const getIsTrackFetching = state => state.get('isTracksFetching');

export default artist;
