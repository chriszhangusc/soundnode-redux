import { createSelector } from 'reselect';
import * as selectors from 'client/modules/reducers';

// Return the sorted array of songs of visible playlist
export const getVisibleSongsAsArray = createSelector(
  [selectors.getVisibleSongMap, selectors.getVisibleSongIds],
  (songsById, songIds) => (songIds && songsById ? songIds.map(id => songsById[id]) : undefined)
);

export const getVisiblePlaylistName = createSelector(
  [selectors.getVisiblePlaylistName],
  playlistName => playlistName
);

export const getCurrentSong = createSelector(
  [selectors.getPlayerSongMap, selectors.getCurrentSongId],
  (songsById, songId) => {
    if (songId) return songsById[songId];
    return null;
  }
);
