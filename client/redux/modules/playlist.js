/* Constants */
export const INIT_PLAYLIST = 'redux-music/playlist/INIT_PLAYLIST';
export const ADD_TO_PLAYLIST = 'redux-music/playlist/ADD_TO_PLAYLIST';
export const TOGGLE_PLAYLIST = 'redux-music/playlist/TOGGLE_PLAYLIST';
export const CLEAR_PLAY_QUEUE = 'redux-music/playlist/CLEAR_PLAY_QUEUE';
export const APPEND_TRACK_TO_PLAYLIST = 'redux-music/playlist/APPEND_TRACK_TO_PLAYLIST';
export const RESHUFFLE = 'redux-music/playlist/RESHUFFLE';
export const SHUFFLE_DRAW = 'redux-music/playlist/SHUFFLE_DRAW';
export const SHUFFLE_DISCARD = 'redux-music/playlist/SHUFFLE_DISCARD';

/* Reducer */
const initialState = {
  trackIds: [],
  hidden: true,
  shuffleDraw: [],
  shuffleDiscard: [],
};

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYLIST:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case INIT_PLAYLIST:
      return {
        ...state,
        trackIds: [...action.payload],
        shuffleDraw: [...action.payload],
        shuffleDiscard: [],
      };
    case CLEAR_PLAY_QUEUE:
      return initialState;
    case APPEND_TRACK_TO_PLAYLIST:
      return {
        ...state,
        trackIds: [...state.trackIds, action.payload],
      };

    // Remove payload(songId) from shuffleDraw
    case SHUFFLE_DRAW:
      // return state.set('shuffleDraw', state.get('shuffleDraw').delete(action.payload));
    case SHUFFLE_DISCARD:
      // return state.set('shuffleDiscard', state.get('shuffleDiscard').push(action.payload));
    case RESHUFFLE:
      // return state.mergeDeep({
      //   shuffleDraw: state.get('shuffleDiscard'),
      // }).set('shuffleDiscard', fromJS([]));
    default:
      return state;
  }
}

export const getPlaylistState = state => state.playlist;
export const isPlaylistHidden = state => getPlaylistState(state).hidden;
export const getPlaylistTrackIds = state => getPlaylistState(state).trackIds;
export const isPlaylistEmpty = state => getPlaylistTrackIds(state).length === 0;
export const isTrackInPlaylist = (state, trackId) => getPlaylistTrackIds(state).indexOf(trackId);
export const getShuffleDraw = state => getPlaylistState(state).shuffleDraw;
export const getShuffleDiscard = state => getPlaylistState(state).shuffleDiscard;
export const isShuffleInitialized = state => getShuffleDraw(state).length === 0;

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

export const shuffleDraw = idx => ({ type: SHUFFLE_DRAW, payload: idx });

export const shuffleDiscard = trackId => ({ type: SHUFFLE_DISCARD, payload: trackId });

export const reshuffle = () => ({ type: RESHUFFLE });

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
    // If all trackIds in newPlaylist is included in currentPlaylist already, do not update.
    const subset = newPlaylist.filter(
      x => currentPlaylist.indexOf(x) > -1,
    ).length === newPlaylist.length;

    if (!subset) {
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
