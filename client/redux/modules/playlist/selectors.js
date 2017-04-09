import { createSelector } from 'reselect';

import { isInShuffleMode } from 'client/redux/modules/player/selectors';

/* Selectors */

/* Basic Selectors */
export const getPlaylistState = state => state.playlist;
export const isPlaylistHidden = state => getPlaylistState(state).hidden;
export const getActivePlaylistName = state => getPlaylistState(state).activePlaylistName;
export const getVisiblePlaylistName = state => getPlaylistState(state).visiblePlaylistName;
export const getShufflePlaylist = state => getPlaylistState(state).shufflePlaylist;

/* Memoize Selectors By Reselect */

export const getActivePlaylist = createSelector(
  getActivePlaylistName,
  getPlaylistState,
  (key, playlistState) => playlistState[key],
);

export const getPlaylistByMode = createSelector(
  isInShuffleMode,
  getShufflePlaylist,
  getActivePlaylist,
  (inShuffleMode, shufflePlaylist, activePlaylist) =>
    (inShuffleMode ? shufflePlaylist : activePlaylist),
);
