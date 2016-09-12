import {createSelector} from 'reselect';
import * as fromReducers from '../reducers';

/*
 * Composing all memoized selectors (Reusing selectors in reducers) for SongCardsContainer
 */
export const getPlaylistName = createSelector(
  [fromReducers.getPlaylistName],
  playlist => playlist
);

export const getFetchState = createSelector(
  [fromReducers.getFetchState],
  isFetching => isFetching
);

export const getPlayingState = createSelector(
  [fromReducers.getPlayingState],
  isPlaying => isPlaying
);

/*
 * Return the songs in current playlist as an array
 */
export const getSongsAsArray = createSelector(
  [fromReducers.getSongMap, fromReducers.getSongIds],
  (songsById, songIds) => {
    if (songIds) return songIds.map(id => songsById[id]);
    return [];
  }
);

/*
 * Return the current active song object
 */
export const getCurrentSong = createSelector(
  [fromReducers.getSongMap, fromReducers.getCurrentSongId],
  (songsById, songId) => {
    if (songId) return songsById[songId];
    return null;
  }
);



// Data needed by SongCardsContainer
// genre: getPlaylistName(state),
// isFetching: getFetchState(state),
// isPlaying: getPlayingState(state),
// songs: getSongsAsArray(state), // may break on search
// playlists: state.playlists,
// currentSong: getCurrentSong(state),
