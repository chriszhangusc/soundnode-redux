import { fromJS, is } from 'immutable';
import { LOAD_PLAYLIST, TOGGLE_PLAYLIST } from 'client/constants/ActionTypes';
import TrackMap from 'client/models/TrackMap';

/* Actions */
export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

/**
 * Load currently visible charts to our playlist
 * @return Action
 */
export const loadPlaylist = trackMap => ({
  type: LOAD_PLAYLIST,
  payload: trackMap || new TrackMap()
});


/* Reducer */
const INITIAL_STATE = fromJS({
  trackMap: new TrackMap(),
  showPlaylist: false
});

const playlist = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_PLAYLIST:
      return state.set('showPlaylist', !state.get('showPlaylist'));
    case LOAD_PLAYLIST:
      // Only load playlist when the new playlist is different from the current one.
      if (!is(state.get('trackMap'), (action.payload))) {
        return state.set('trackMap', action.payload);
      }
      return state;
    default:
      return state;
  }
};

export const getShowPlaylist = state => state.get('showPlaylist');

export const getPlaylistAsOrderedMap = state => state.get('trackMap');

export const getPlaylistAsArray = (state) => {
  const trackMap = state.get('trackMap');
  if (trackMap) return trackMap.toArray();
  return [];
};

export default playlist;
