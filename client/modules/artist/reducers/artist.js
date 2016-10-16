import { fromJS } from 'immutable';
import Artist from 'client/models/Artist';
import Track from 'client/models/Track';
import TrackMap from 'client/models/TrackMap';
import {
  ARTIST_REQUEST,
  ARTIST_RECEIVE,
  ARTIST_FAILURE,
  ARTIST_TRACKS_REQUEST,
  ARTIST_TRACKS_RECEIVE,
  ARTIST_TRACKS_FAILURE
} from 'client/constants/ActionTypes';

// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isArtistFetching: false,
  artist: new Artist(),
  trackMap: new TrackMap(),
  tracksNextHref: null,
  isTracksFetching: false
});


const artistReceived = (state, normalized) => {
  const artistId = normalized.result;
  const artistRecord = new Artist(normalized.entities.artists[artistId]);
  return state
  .set('isArtistFetching', false)
  .set('artist', artistRecord);
};

const artistTracksReceived = (state, normalized) => {
  const { result, nextHref, entities } = normalized;
  const { tracks, artists } = entities;
  let newTracks = new TrackMap();
  result.forEach((id) => {
    // user is normalized to an id, we need to set it to a ArtistRecord
    const artistId = tracks[id].user;
    const artist = new Artist(artists[artistId]);
    let track = new Track(tracks[id]);
    track = track.set('user', artist);
    newTracks = newTracks.set(id, track);
  });
  return state.merge({
    trackMap: newTracks,
    tracksNextHref: nextHref,
    isTracksFetching: false
  });
};

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTIST_REQUEST:
      return state.set('isArtistFetching', true);
    case ARTIST_RECEIVE:
      return artistReceived(state, action.payload);
    case ARTIST_TRACKS_REQUEST:
      return state.set('isTracksFetching', true);
    case ARTIST_TRACKS_RECEIVE:
      return artistTracksReceived(state, action.payload);
    default:
      return state;
  }
};

export const getArtistRecord = state => state.get('artist');
export const getArtistTrackMap = state => state.get('trackMap');
export const getIsArtistFetching = state => state.get('isArtistFetching');
export const getIsTrackFetching = state => state.get('isTracksFetching');
export const getTracksNextHref = state => state.get('tracksNextHref');
export default artist;
