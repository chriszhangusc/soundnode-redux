import { createSelector } from 'reselect';
import { shuffle } from 'lodash';

import { isInShuffleMode } from 'client/redux/modules/player/selectors';

/* Selectors */
export const getPlaylistState = state => state.playlist;
export const isPlaylistHidden = state => getPlaylistState(state).hidden;
export const getActivePlaylistName = state => getPlaylistState(state).activePlaylistName;
export const getVisiblePlaylistName = state => getVisiblePlaylistName(state).visiblePlaylistName;

export const getActivePlaylist = (state) => {
  const key = getActivePlaylistName(state);
  const playlistState = getPlaylistState(state);
  return playlistState[key];
};

// Whenever the activePlaylist changes, shuffle the playlist.
export const getShufflePlaylist = createSelector(
  getActivePlaylist,
  playlist => shuffle(playlist),
);

// If under shuffle mode, return the shuffled playlist, else return the activePlaylist
export const getPlaylistByMode = (state) => {
  const inShuffleMode = isInShuffleMode(state);
  const shufflePlaylist = getShufflePlaylist(state);
  return inShuffleMode ? shufflePlaylist : getActivePlaylist(state);
};

