import { fromJS } from 'immutable';
import Artist from 'client/models/Artist';
import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  USER_RECEIVED,
  START_TRACKS_FETCH,
  END_TRACKS_FETCH,
  TRACKS_RECEIVED
} from 'client/constants/ActionTypes';
// The currently active artist. (ArtistDetails Page)
const INITIAL_STATE = fromJS({
  isFetching: false,
  artist: new Artist(),
  tracksById: {},
  trackIds: [],
  trackNextHref: null,
  isTracksFetching: false
});

const artist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_ARTIST_FETCH:
      return state.set('isFetching', true);
    case END_ARTIST_FETCH:
      return state.set('isFetching', false);
    case USER_RECEIVED:
      return state.merge(fromJS({
        artist: action.payload
      })); // action.payload is an instance of Artist.
    case START_TRACKS_FETCH:
      return state.set('isTracksFetching', true);
    case END_TRACKS_FETCH:
      return state.set('isTracksFetching', false);
    case TRACKS_RECEIVED:
      return state.merge(fromJS(action.payload));
    default:
      return state;
  }
};

export const getArtistRecord = state => state.get('artist');

export const getIsFetching = state => state.get('isFetching');
export const getTracksAsArray = (state) => {
  const tracksById = state.get('tracksById').toJS();
  const trackIds = state.get('trackIds').toJS();
  return trackIds.map(id => tracksById[id]);
};
export const getTracksFetchState = state => state.get('isTracksFetching');

export default artist;
