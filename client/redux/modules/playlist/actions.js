import { shuffle } from 'lodash';
import {
  CHANGE_VISIBLE_PLAYLIST_NAME,
  CHANGE_ACTIVE_PLAYLIST_NAME,
  TOGGLE_PLAYLIST,
  APPEND_TRACK_TO_PLAYLIST,
  CLEAR_PLAY_QUEUE,
  CLEAR_SHUFFLE_PLAYLIST,
  UPDATE_SHUFFLE_PLAYLIST,
} from './types';

import { getShufflePlaylist } from './selectors';

/* Action Creators */

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

export function shufflePlaylist() {
  return (dispatch, getState) => {
    const state = getState();
    const activeShufflePlaylist = getShufflePlaylist(state);
    const shuffled = shuffle(activeShufflePlaylist);
    dispatch(updateShufflePlaylist(shuffled));
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

export function clearPlayQueue() {
  return {
    type: CLEAR_PLAY_QUEUE,
    payload: {
      notificationSuccess: 'Play Queue Cleared!',
    },
  };
}
