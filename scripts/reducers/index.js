import { combineReducers } from 'redux';
// import { createSelector } from 'reselect';
import * as fromPlaylists from './playlists';
import * as fromPlayer from './player';
import * as fromAuth from './auth';

const rootReducer = combineReducers({
  playlists: fromPlaylists.default,
  player: fromPlayer.default,
  auth: fromAuth.default
});

// Selectors are our reading API of our state,
// so it is recommended to colocate them with the reducers.

/* From Auth */
// export const getUid = state => fromAuth.getUid(state.auth);

/* From Playlists */

// Return the current player playlist name
export const getPlayerPlaylistName = state => fromPlaylists.getPlayerPlaylistName(state.playlists);

// Return the current playlist object itself
export const getPlayerPlaylist = state => fromPlaylists.getPlayerPlaylist(state.playlists);

// Return the visible playlist name
export const getVisiblePlaylistName = state =>
  fromPlaylists.getVisiblePlaylistName(state.playlists);

// Return the visible playlist object itself
export const getVisiblePlaylist = state => fromPlaylists.getVisiblePlaylist(state.playlists);

// Return the fetch state of the current visible playlist
export const getVisibleFetchState = state => fromPlaylists.getVisibleFetchState(state.playlists);

// Get the Songs Object-Array of current player playlist
export const getPlayerSongMap = state => fromPlaylists.getPlayerSongMap(state.playlists);

export const getPlayerSongIds = state => fromPlaylists.getPlayerSongIds(state.playlists);

export const getVisibleSongMap = state => fromPlaylists.getVisibleSongMap(state.playlists);

export const getVisibleSongIds = state => fromPlaylists.getVisibleSongIds(state.playlists);

export const getVisibleNextUrl = state => fromPlaylists.getVisibleNextUrl(state.playlists);

// Return if the playlistName is already loaded
export const playlistExists = (state, playlistName) =>
  fromPlaylists.playlistExists(state.playlists, playlistName);

/* From players */

export const getShuffleDraw = state => fromPlayer.getShuffleDraw(state.player);

export const getShuffleDiscard = state => fromPlayer.getShuffleDiscard(state.player);

export const shuffleInitialized = state => fromPlayer.shuffleInitialized(state.player);

export const getCurrentSongId = state => fromPlayer.getCurrentSongId(state.player);

export const getPlayingState = state => fromPlayer.getPlayingState(state.player);

export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.player);

export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.player);

export const getCurrentTime = state => fromPlayer.getCurrentTime(state.player);

export const getSeekState = state => fromPlayer.getSeekState(state.player);

export const getPlayerMode = state => fromPlayer.getPlayerMode(state.player);

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
