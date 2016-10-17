import { fromJS } from 'immutable';
import Artist from 'client/models/Artist';
import TrackMap from 'client/models/TrackMap';
import { denormalizeTracks, denormalizeArtist } from 'client/models/denormalizr';
import {
  ARTIST_REQUEST,
  ARTIST_RECEIVE,
  // ARTIST_FAILURE,
  ARTIST_TRACKS_REQUEST,
  ARTIST_TRACKS_RECEIVE,
  // ARTIST_TRACKS_FAILURE
} from 'client/constants/ActionTypes';

// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isArtistFetching: false,
  isTracksFetching: false,
  artist: new Artist(),
  tracks: new TrackMap(),
  tracksNextHref: null
});

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTIST_REQUEST:
      return state.set('isArtistFetching', true);
    case ARTIST_RECEIVE:
      return state.merge({
        artist: denormalizeArtist(action.payload),
        isArtistFetching: false
      });
    case ARTIST_TRACKS_REQUEST:
      return state.set('isTracksFetching', true);
    case ARTIST_TRACKS_RECEIVE:
      return state.merge({
        tracks: denormalizeTracks(action.payload),
        tracksNextHref: action.payload.nextHref,
        isTracksFetching: false
      });
    default:
      return state;
  }
};

export const getArtistRecord = state => state.get('artist');
export const getArtistTrackMap = state => state.get('tracks');
export const getIsArtistFetching = state => state.get('isArtistFetching');
export const getIsTrackFetching = state => state.get('isTracksFetching');
export const getTracksNextHref = state => state.get('tracksNextHref');
export default artist;
