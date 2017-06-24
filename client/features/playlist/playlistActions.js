import { getPlayerTrackId, isInShuffleMode } from 'features/player/playerSelectors';
import shuffle from 'lodash/shuffle';
import uniq from 'lodash/uniq';
import { shiftToFront } from './PlaylistUtils';
import * as types from './playlistConsts';

import {
  getActivePlaylist,
  getVisiblePlaylistName,
  getActivePlaylistName,
} from './playlistSelectors';

export function clearPlayQueue() {
  return {
    type: types.PLAYLIST_CLEAR_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}

export const clearShufflePlaylist = () => ({
  type: types.PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
});

export const updateShuffledPlaylist = shuffledPlaylist => ({
  type: types.PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  payload: {
    shuffledPlaylist,
  },
});

export const updateVisiblePlaylistName = visiblePlaylistName => ({
  type: types.PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  payload: {
    visiblePlaylistName,
  },
});

export const updateActivePlaylistName = activePlaylistName => ({
  type: types.PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  payload: {
    activePlaylistName,
  },
});

export const togglePlaylist = () => ({ type: types.PLAYLIST_TOGGLE });

export function updatePlaylist(playlistName, trackIds) {
  return {
    type: types.PLAYLIST_UPDATE,
    payload: {
      playlistName,
      trackIds,
    },
  };
}

export function appendToPlaylist(playlistName, trackIds) {
  return {
    type: types.PLAYLIST_APPEND,
    payload: {
      playlistName,
      trackIds,
    },
  };
}

/* Thunks logic */

// Shuffle the current active playlist and update shuffled playlist with it
export function shufflePlaylist() {
  return (dispatch, getState) => {
    const state = getState();
    const activePlaylist = getActivePlaylist(state);
    const playerTrackId = getPlayerTrackId(state);
    // Every time we reshuffle the playlist, we need to move the current playing track to the
    // first position.
    const shuffled = shiftToFront(shuffle(activePlaylist), playerTrackId);
    dispatch(updateShuffledPlaylist(shuffled));
  };
}

export function updateShuffledPlaylistIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const inShuffleMode = isInShuffleMode(state);
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (inShuffleMode && visiblePlaylistName === activePlaylistName) {
      dispatch(shufflePlaylist());
    }
  };
}

export function updateVisiblePlaylist(trackIds) {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    // Keep the side effects in the thunks
    dispatch(updatePlaylist(visiblePlaylistName, uniq(trackIds)));
    dispatch(updateShuffledPlaylistIfNeeded());
  };
}

export function appendToVisiblePlaylist(trackIds) {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    // Keep the side effects in the thunks
    dispatch(appendToPlaylist(visiblePlaylistName, uniq(trackIds)));
    dispatch(updateShuffledPlaylistIfNeeded());
  };
}

// export function updatePlaylistIfNeeded(playlistName, playlistIds) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const inShuffleMode = isInShuffleMode(state);
//     const visiblePlaylistName = getVisiblePlaylistName(state);
//     const activePlaylistName = getActivePlaylistName(state);
//     if (visiblePlaylistName !== activePlaylistName) return;
//     if (inShuffleMode) {
//       console.log('Update shuffle playlist');
//       // Fix later
//       // dispatch(shufflePlaylist());
//     } else {
//       // Normal playlist update
//       dispatch(updatePlaylist(playlistName, playlistIds));
//     }
//   };
// }

// Called when playing song through song cards list
export function switchActivePlaylistIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (activePlaylistName !== visiblePlaylistName) {
      dispatch(updateActivePlaylistName(visiblePlaylistName));
      dispatch(updateShuffledPlaylistIfNeeded());
      // Update shuffled playlist
      // Reshuffle the new active playlist if in shuffle mode
    }
  };
}
