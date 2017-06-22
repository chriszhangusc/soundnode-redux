import { getPlayerTrackId, isInShuffleMode } from 'client/features/player/playerSelectors';
import shuffle from 'lodash/shuffle';
import uniq from 'lodash/uniq';
import { shiftToFront } from './PlaylistUtils';
import {
  PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_TOGGLE,
  PLAYLIST_UPDATE,
  APPEND_TRACK_TO_PLAYLIST,
  PLAYLIST_CLEAR_QUEUE,
  PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
  PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  VISIBLE_PLAYLIST_UPDATE,
  VISIBLE_PLAYLIST_APPEND,
  PLAYLIST_APPEND,
} from './playlistConsts';

import {
  getActivePlaylist,
  getVisiblePlaylistName,
  getActivePlaylistName,
} from './playlistSelectors';

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

export const updateShuffledPlaylist = shuffledPlaylist => ({
  type: PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  payload: {
    shuffledPlaylist,
  },
});

export const changeVisiblePlaylistName = visiblePlaylistName => ({
  type: PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  payload: {
    visiblePlaylistName,
  },
});

export const changeActivePlaylistName = activePlaylistName => ({
  type: PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  payload: {
    activePlaylistName,
  },
});

export const togglePlaylist = () => ({ type: PLAYLIST_TOGGLE });

export const appendTrackToPlaylist = trackId => ({
  type: APPEND_TRACK_TO_PLAYLIST,
  payload: {
    trackId,
  },
});

export function updatePlaylist(playlistName, trackIds) {
  return {
    type: PLAYLIST_UPDATE,
    payload: {
      playlistName,
      trackIds,
    },
  };
}

export function appendToPlaylist(playlistName, trackIds) {
  return {
    type: PLAYLIST_APPEND,
    payload: {
      playlistName,
      trackIds,
    },
  };
}

/* Thunks logic */

export function updateVisiblePlaylist(trackIds) {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    // Keep the side effects in the thunks
    dispatch(updatePlaylist(visiblePlaylistName, uniq(trackIds)));
  };
}

export function appendToVisiblePlaylist(trackIds) {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    // Keep the side effects in the thunks
    dispatch(appendToPlaylist(visiblePlaylistName, uniq(trackIds)));
  };
}

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

export function updateShufflePlaylistIfNeeded() {
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

export function updatePlaylistIfNeeded(playlistName, playlistIds) {
  return (dispatch, getState) => {
    const state = getState();
    const inShuffleMode = isInShuffleMode(state);
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (visiblePlaylistName !== activePlaylistName) return;
    if (inShuffleMode) {
      // Fix later
      dispatch(shufflePlaylist());
    } else {
      // Normal playlist update
      dispatch(updatePlaylist(playlistName, playlistIds));
    }
  };
}


// Called when playing song through song cards list
export function switchActivePlaylistIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const visiblePlaylistName = getVisiblePlaylistName(state);
    const activePlaylistName = getActivePlaylistName(state);
    if (activePlaylistName !== visiblePlaylistName) {
      dispatch(changeActivePlaylistName(visiblePlaylistName));
    }
  };
}

