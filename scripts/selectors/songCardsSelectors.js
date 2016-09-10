import {createSelector} from 'reselect';

const playlistsSelector = state => state.playlists;
const genreSelector = state => state.playlists.genre

// Return the song collection of current playlist
export const currentPlaylistSelector = createSelector(
  genreSelector,
  playlistsSelector,
  (genre, playlists) => {
    return playlists[genre];
  }
);

export const currentPlaylistSongsSelector = createSelector(
  currentPlaylistSelector,
  (playlist) => {
    return playlist.songs;
  }
)
