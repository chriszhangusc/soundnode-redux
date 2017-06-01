import { getPlayerTrackId, isInShuffleMode } from 'client/features/player/playerSelectors';
import concat from 'lodash/concat';
import shuffle from 'lodash/shuffle';

import {
  PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_TOGGLE,
  APPEND_TRACK_TO_PLAYLIST,
  PLAYLIST_CLEAR_QUEUE,
  PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
  PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
} from './playlistConsts';

import { getActivePlaylist, getVisiblePlaylistName, getActivePlaylistName } from './playlistSelectors';
/* Action Creators */

export function clearPlayQueue() {
  return {
    type: PLAYLIST_CLEAR_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}

export const clearShufflePlaylist = () => ({
  type: PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
});

export const updateShufflePlaylist = playlist => ({
  type: PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  payload: playlist,
});

export const changeVisiblePlaylistName = playlistName => ({
  type: PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  payload: playlistName,
});

export const changeActivePlaylistName = playlistName => ({
  type: PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  payload: playlistName,
});

export const togglePlaylist = () => ({ type: PLAYLIST_TOGGLE });

export const appendTrackToPlaylist = trackId => ({
  type: APPEND_TRACK_TO_PLAYLIST,
  payload: trackId,
});

/* Thunks logic */

// Shift an element to the head of the array, if element is not in the array
function shiftToFront(arr, target) {
  if (!arr.indexOf(target)) return arr;
  return concat(target, arr.filter(x => x !== target));
}

export function shufflePlaylist() {
  return (dispatch, getState) => {
    const state = getState();
    const activePlaylist = getActivePlaylist(state);
    const playerTrackId = getPlayerTrackId(state);
    // Every time we reshuffle the playlist, we need to move the current playing track to the
    // first position.
    const shuffled = shiftToFront(shuffle(activePlaylist), playerTrackId);

    dispatch(updateShufflePlaylist(shuffled));
  };
}

// Called whenever the original playlist gets updated
export function updateShufflePlaylistIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const inShuffleMode = isInShuffleMode(state);
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (inShuffleMode && (visiblePlaylistName === activePlaylistName)) {
      dispatch(shufflePlaylist());
    }
  };
}

// #TODO: Review later
// export function addToPlayQueueIfNeeded(trackId) {
//   // If the track to be added is already in current play queue, do nothing
//   // If not, append it to the end of the list.
//   return (dispatch, getState) => {
//     // const state = getState();
//     // const currentPlaylist = getActivePlaylist(state);
//     // if (currentPlaylist.indexOf(trackId) === -1) {
//     //   dispatch(appendTrackToPlaylist(trackId));
//     // }
//   };
// }



// If newPlaylistName is different from activePlaylistName,
// which means we need to switch to new playlist
export function switchPlaylistIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (activePlaylistName !== visiblePlaylistName) {
      dispatch(changeActivePlaylistName(visiblePlaylistName));
      dispatch(updateShufflePlaylistIfNeeded());
    }
  };
}

