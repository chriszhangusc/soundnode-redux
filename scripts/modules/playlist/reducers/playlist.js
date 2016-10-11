import { fromJS } from 'immutable';
import { LOAD_PLAYLIST } from 'client/constants/ActionTypes';
import TrackMap from 'client/models/TrackMap';

/* Current Playing Playlist */
const INITIAL_STATE = fromJS({
  trackMap: new TrackMap()
});

const playlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYLIST:
      return state.set('trackMap', action.payload);
    default:
      return state;
  }
};

export const getPlaylistAsOrderedMap = state => state.get('trackMap');

export const getPlaylistAsArray = (state) => {
  const trackMap = state.get('trackMap');
  if (trackMap) return trackMap.toArray();
  return [];
};

export default playlist;
