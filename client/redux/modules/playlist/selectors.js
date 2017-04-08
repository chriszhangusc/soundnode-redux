import { createSelectorCreator, defaultMemoize, createSelector } from 'reselect';
import { isEqual, concat, shuffle, memoize } from 'lodash';

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

// const selector = customSelectorCreator(
//   [getActivePlaylist, getPlayerTrackId],
//   (playlist, trackId) => {
//     return concat(trackId, shuffle(playlist.filter(x => x !== trackId)));
//   }
// );

// Compute derived data using reselect
// getActivePlaylist will return the reference of current playlist, when we load more
// redux will create a new array which will trigger a reshuffle.
// Everytime we need to reshuffle, make sure to put the current track to the top of the list.
export const getShufflePlaylist = createSelector(
  getActivePlaylist,
  playlist => shuffle(playlist),
);

// const resolver = memo => JSON.stringify(memo);

// console.log(getPlayerTrackId);

// // Only memoize first arguement
// const createFusionSelector = createSelectorCreator(memoize, resolver);

// const getShufflePlaylist = createSelector(
//   getActivePlaylist,
//   getPlayerTrackId,
//   (playlist, playerTrackId) => {
//     return concat(playerTrackId, shuffle(playlist.filter(x !== playerTrackId)));
//   },
// );

// export function getTransformedShufflePlaylist(state) {
//   const shufflePlaylist = getShufflePlaylist(state);
//   const playerTrackId = getPlayerTrackId(state);
//   const idx = shufflePlaylist.indexOf(playerTrackId);
//   if (idx < 0) return shufflePlaylist;
//   return concat(playerTrackId, shufflePlaylist.filter(x => x !== playerTrackId));
// }

// If under shuffle mode, return the shuffled playlist, else return the activePlaylist
export const getPlaylistByMode = (state) => {
  const inShuffleMode = isInShuffleMode(state);
  return inShuffleMode ? getShufflePlaylist(state) : getActivePlaylist(state);
};

