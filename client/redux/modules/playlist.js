import { fromJS } from 'immutable';

/* Constants */
export const INIT_PLAYLIST = 'redux-music/playlist/INIT_PLAYLIST';
export const ADD_TO_PLAYLIST = 'redux-music/playlist/ADD_TO_PLAYLIST';
export const TOGGLE_PLAYLIST = 'redux-music/playlist/TOGGLE_PLAYLIST';
export const CLEAR_PLAY_QUEUE = 'redux-music/playlist/CLEAR_PLAY_QUEUE';
export const APPEND_TRACK_TO_PLAYLIST = 'redux-music/playlist/APPEND_TRACK_TO_PLAYLIST';
/* Reducer */
const initialState = fromJS({
  trackIds: [],
  hidden: true,
});

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYLIST:
      return state.set('hidden', !state.get('hidden'));
    case INIT_PLAYLIST:
      return state.set('trackIds', fromJS(action.payload));
    case CLEAR_PLAY_QUEUE:
      return initialState;
    case APPEND_TRACK_TO_PLAYLIST:
      return state.set('trackIds', state.get('trackIds').push(action.payload));
    default:
      return state;
  }
}

export const getPlaylistState = state => state.get('playlist');
export const isPlaylistHidden = state => getPlaylistState(state).get('hidden');
export const getPlaylistTrackIds = state => getPlaylistState(state).get('trackIds');
export const isPlaylistEmpty = state => getPlaylistTrackIds(state).isEmpty();
export const isTrackInPlaylist = (state, trackId) => getPlaylistTrackIds(state).indexOf(trackId);


/* Actions */
export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

/**
 * Load currently visible charts to our playlist
 * @return Action
 */
export const initPlaylist = trackIds => ({
  type: INIT_PLAYLIST,
  payload: trackIds,
});

export const appendTrackToPlaylist = trackId => ({
  type: APPEND_TRACK_TO_PLAYLIST,
  payload: trackId,
});

/* Thunks logic */

// For single track
export function addToPlayQueueIfNeeded(trackId) {
  // If the track to be added is already in current play queue, do nothing
  // If not, append it to the end of the list.
  return (dispatch, getState) => {
    const state = getState();
    const currentPlaylist = getPlaylistTrackIds(state);
    if (currentPlaylist.indexOf(trackId) === -1) {
      dispatch(appendTrackToPlaylist(trackId));
    }
  };
}

export function initPlaylistIfNeeded(newPlaylist) {
  return (dispatch, getState) => {
    const state = getState();
    const currentPlaylist = getPlaylistTrackIds(state);
    // If all trackIds in newPlaylist is included in currentPlaylist, skip...
    if (!newPlaylist.isSubset(currentPlaylist)) {
      dispatch(initPlaylist(newPlaylist));
    }
  };
}

export function clearPlayQueue() {
  return {
    type: CLEAR_PLAY_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}
