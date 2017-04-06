import { CHARTS_RECEIVED } from 'client/redux/modules/charts';
import { concat, last, head, initial, tail, shuffle, find } from 'lodash';
import { LOOP, REPEAT, SHUFFLE, PREV, NEXT } from 'client/constants/PlayerConsts';
import { getPlayerTrackId, isInShuffleMode, getPlayerMode } from './player';
/* Constants */
export const UPDATE_PLAYLIST = 'redux-music/playlist/UPDATE_PLAYLIST';
export const ADD_TO_PLAYLIST = 'redux-music/playlist/ADD_TO_PLAYLIST';
export const TOGGLE_PLAYLIST = 'redux-music/playlist/TOGGLE_PLAYLIST';
export const CLEAR_PLAY_QUEUE = 'redux-music/playlist/CLEAR_PLAY_QUEUE';
export const APPEND_TRACK_TO_PLAYLIST = 'redux-music/playlist/APPEND_TRACK_TO_PLAYLIST';
export const UPDATE_SHUFFLE_PLAYLIST = 'redux-music/playlist/UPDATE_SHUFFLE_PLAYLIST';
export const CLEAR_SHUFFLE_PLAYLIST = 'redux-music/playlist/CLEAR_SHUFFLE_PLAYLIST';
export const CHANGE_ACTIVE_PLAYLIST_NAME = 'redux-music/playlist/CHANGE_ACTIVE_PLAYLIST_NAME';
/* Reducer */
const initialState = {
  // The name of currently active playlist
  activePlaylistName: '',
  // The shuffled or modded playlist
  shufflePlaylist: [],
  hidden: true,

};

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_PLAYLIST:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case CLEAR_PLAY_QUEUE:
      return initialState;

    // Need to handle shuffle mode!!
    case APPEND_TRACK_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };

    case CHARTS_RECEIVED:
      return {
        ...state,
        [action.playlistName]: (state[action.playlistName] ? [...state[action.playlistName], ...action.payload.result] : [...action.payload.result]).slice(0, 50),
      };

    case CHANGE_ACTIVE_PLAYLIST_NAME:
      return {
        ...state,
        activePlaylistName: action.payload,
      };

    case UPDATE_SHUFFLE_PLAYLIST:
      return {
        ...state,
        shufflePlaylist: [...action.payload],
      };
    case CLEAR_SHUFFLE_PLAYLIST:
      return {
        ...state,
        shufflePlaylist: [],
      };
    default:
      return state;
  }
}
/* Selectors */
export const getPlaylistState = state => state.playlist;

export const isPlaylistHidden = state => getPlaylistState(state).hidden;
export const getActivePlaylistName = state => getPlaylistState(state).activePlaylistName;

export const getShufflePlaylist = state => getPlaylistState(state).shufflePlaylist;

export const getActivePlaylist = (state) => {
  const key = getActivePlaylistName(state);
  const playlistState = getPlaylistState(state);
  const shuffleMode = isInShuffleMode(state);
  // if (!playlistState[key]) return [];
  return shuffleMode ? getShufflePlaylist(state) : playlistState[key];
};


/* Actions */

export const changeActivePlaylistName = playlistName => ({
  type: CHANGE_ACTIVE_PLAYLIST_NAME,
  payload: playlistName,
});

export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

export const appendTrackToPlaylist = trackId => ({
  type: APPEND_TRACK_TO_PLAYLIST,
  payload: trackId,
});

export const updateShufflePlaylist = playlist => ({
  type: UPDATE_SHUFFLE_PLAYLIST,
  payload: playlist,
});

export const clearShufflePlaylist = () => ({ type: CLEAR_SHUFFLE_PLAYLIST });
/* Thunks logic */

// For single track
// On shuffle icon click
export function shufflePlaylist() {
  return (dispatch, getState) => {
    const state = getState();
    const curTrackId = getPlayerTrackId(state);
    const playlist = getActivePlaylist(state);
    let newShufflePlaylist = shuffle(playlist);
    if (curTrackId) {
      // Move current trackId to the head of shuffle playlist
      newShufflePlaylist = newShufflePlaylist.filter(x => x !== curTrackId);
      newShufflePlaylist = concat(curTrackId, newShufflePlaylist);
    }
    dispatch(updateShufflePlaylist(newShufflePlaylist));
  };
}

export function addToPlayQueueIfNeeded(trackId) {
  // If the track to be added is already in current play queue, do nothing
  // If not, append it to the end of the list.
  return (dispatch, getState) => {
    // const state = getState();
    // const currentPlaylist = getActivePlaylist(state);
    // if (currentPlaylist.indexOf(trackId) === -1) {
    //   dispatch(appendTrackToPlaylist(trackId));
    // }
  };
}

// // Pull playlist from ui visibleTrackIds
// export function updatePlaylistIfNeeded() {
//   return (dispatch, getState) => {
//     const state = getState();
//     // This is the playlist with original order
//     const originalPlaylist = getOriginalPlaylist(state);
//     const visibleTrackIds = getVisibleTrackIds(state);
//     // If all playlist in visibleTrackIds is included in originalPlaylist already, do not update.
//     const subset = visibleTrackIds.filter(
//       x => originalPlaylist.indexOf(x) > -1,
//     ).length === visibleTrackIds.length;

//     if (!subset) {
//       dispatch(updatePlaylist(visibleTrackIds));
//       // We need to keep shuffle array up-to-date
//       // dispatch(shufflePlaylist());
//     }
//   };
// }

export function clearPlayQueue() {
  return {
    type: CLEAR_PLAY_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}
