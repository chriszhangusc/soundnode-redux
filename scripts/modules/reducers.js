/* Main reducer */
import { combineReducers } from 'redux-immutable';
// import { createSelector } from 'reselect';
import * as fromPlaylists from './playlists/reducers/playlists';
import * as fromPlayer from './player/reducers/player';
import * as fromUser from './user/reducers/user';

const rootReducer = combineReducers({
  playlists: fromPlaylists.default,
  player: fromPlayer.default,
  auth: fromUser.default
});

// Selectors are our reading API of our state,
// so it is recommended to colocate them with the reducers.

/* From Auth */
export const isSongLiked = (state, songId) => {
  const likes = fromUser.getLikes(state.get('auth'));
  return (likes.indexOf(songId) !== -1);
};

export const getUid = state => fromUser.getUid(state.get('auth'));

export const getDisplayName = state => fromUser.getDisplayName(state.get('auth'));

export const getPhotoUrl = state => fromUser.getPhotoUrl(state.get('auth'));

/* From Playlists */

// Return the current player playlist name
export const getPlayerPlaylistName = state =>
  fromPlaylists.getPlayerPlaylistName(state.get('playlists'));

// Return the current playlist object itself
export const getPlayerPlaylist = state => fromPlaylists.getPlayerPlaylist(state.get('playlists'));

// Return the visible playlist name
export const getVisiblePlaylistName = state =>
  fromPlaylists.getVisiblePlaylistName(state.get('playlists'));

// Return the visible playlist object itself
export const getVisiblePlaylist = state => fromPlaylists.getVisiblePlaylist(state.get('playlists'));

// Return the fetch state of the current visible playlist
export const getVisibleFetchState = state =>
  fromPlaylists.getVisibleFetchState(state.get('playlists'));

// Get the Songs Object-Array of current player playlist
export const getPlayerSongMap = state => fromPlaylists.getPlayerSongMap(state.get('playlists'));

export const getPlayerSongIds = state => fromPlaylists.getPlayerSongIds(state.get('playlists'));

export const getVisibleSongMap = state => fromPlaylists.getVisibleSongMap(state.get('playlists'));

export const getVisibleSongIds = state => fromPlaylists.getVisibleSongIds(state.get('playlists'));

export const getVisibleNextUrl = state => fromPlaylists.getVisibleNextUrl(state.get('playlists'));

// Return if the playlistName is already loaded
export const playlistExists = (state, playlistName) =>
  fromPlaylists.playlistExists(state.get('playlists'), playlistName);

/* From player */

export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.get('player'));

export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.get('player'));

export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.get('player'));

export const getCurrentSongId = state => fromPlayer.getCurrentSongId(state.get('player'));

export const getCurrentSong = state => fromPlayer.getCurrentSong(state.get('player'));

export const getPlayingState = state => fromPlayer.getPlayingState(state.get('player'));

export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.get('player'));

export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.get('player'));

export const getCurrentTime = state => fromPlayer.getCurrentTime(state.get('player'));

export const getSeekState = state => fromPlayer.getSeekState(state.get('player'));

export const getPlayerMode = state => fromPlayer.getPlayerMode(state.get('player'));

/* Mixed / Memoized Selectors */
// Not sure if we should put it here.
// export const getCurrentSong = createSelector(
//   [getPlayerSongMap, getCurrentSongId],
//   (songsById, songId) => {
//     if (songId) return songsById[songId];
//     return null;
//   }
// );

export default rootReducer;
