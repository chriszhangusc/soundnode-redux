import { createSelector } from 'reselect';
import { isInShuffleMode } from 'client/features/player/playerSelectors';

export const getPlaylistState = state => state.playlist;

export const isPlaylistHidden = createSelector(getPlaylistState, state => state.hidden);

export const getActivePlaylistName = createSelector(
  getPlaylistState,
  state => state.activePlaylistName,
);

export const getVisiblePlaylistName = createSelector(
  getPlaylistState,
  state => state.visiblePlaylistName,
);

export const getShufflePlaylist = createSelector(getPlaylistState, state => state.shufflePlaylist);

export const getVisiblePlaylist = createSelector(
  getPlaylistState,
  getVisiblePlaylistName,
  (state, playlistName) => playlistName && state[playlistName],
);

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

export function getPlaylistByName(state, name) {
  return name && state[name];
}
