import { getPlayerTrackId, isInShuffleMode } from 'client/redux/modules/player/selectors';
// import { concat, shuffle } from 'lodash';
import concat from 'lodash/concat';
import shuffle from 'lodash/shuffle';

import {
  CHANGE_VISIBLE_PLAYLIST_NAME,
  CHANGE_ACTIVE_PLAYLIST_NAME,
  TOGGLE_PLAYLIST,
  APPEND_TRACK_TO_PLAYLIST,
  CLEAR_PLAY_QUEUE,
  CLEAR_SHUFFLE_PLAYLIST,
  UPDATE_SHUFFLE_PLAYLIST,
} from './action-types';

import { getActivePlaylist, getVisiblePlaylistName, getActivePlaylistName } from './selectors';
/* Action Creators */

export function clearPlayQueue() {
  return {
    type: CLEAR_PLAY_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}

export const clearShufflePlaylist = () => ({
  type: CLEAR_SHUFFLE_PLAYLIST,
});

export const updateShufflePlaylist = playlist => ({
  type: UPDATE_SHUFFLE_PLAYLIST,
  payload: playlist,
});

export const changeVisiblePlaylistName = playlistName => ({
  type: CHANGE_VISIBLE_PLAYLIST_NAME,
  payload: playlistName,
});

export const changeActivePlaylistName = playlistName => ({
  type: CHANGE_ACTIVE_PLAYLIST_NAME,
  payload: playlistName,
});

export const togglePlaylist = () => ({ type: TOGGLE_PLAYLIST });

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
    // front.
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



// If playlistName is different with activePlaylistName,
// which means we need to switch to new playlist
export function switchPlaylistIfNeeded(newPlaylistName) {
  return (dispatch, getState) => {
    // Update activePlaylist name!
    const state = getState();
    const activePlaylistName = getActivePlaylistName(state);
    if (activePlaylistName !== newPlaylistName) {
      dispatch(changeActivePlaylistName(newPlaylistName));
      dispatch(updateShufflePlaylistIfNeeded());
    }
  };
}

