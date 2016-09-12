import { createSelector } from 'reselect';

export const getPlaylistName = state => state.player.playlist
export const getPlaylists = state => state.playlists
export const getCurrentSongId = state => state.player.songId

export const getPlaylist = createSelector (
  [getPlaylistName, getPlaylists],
  (playlistName, playlists) => playlists[playlistName]
);

export const getFetchState = createSelector(
  [getPlaylist],
  (playlist) => playlist.isFetching
);



export const getSongsAsArray = createSelector(
  [getPlaylist],
  playlist => {
    const songsById = playlist.songs;
    const songIds = playlist.songIds;
    return songIds.map(id => songsById[id]);
  }
);

export const getCurrentSong = createSelector(
  [getPlaylist, getCurrentSongId],
  (playlist, songId) => {
    if (songId) return playlist.songs[songId];
    return null;
  }
);
