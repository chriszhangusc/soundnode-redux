import playlists from './playlists';
import player from './player';
import visiblePlaylist from './visiblePlaylist';
import { combineReducers } from 'redux';
import * as fromPlaylists from './playlists';
import * as fromPlaylist from './playlist';
import * as fromPlayer from './player';
/* Reducers */
const rootReducer = combineReducers({
  playlists,
  player,
  visiblePlaylist
});

// The key requirement is that a reducer cannot modify an existing state object; it must produce a new object.

/* Pure state selectors */

/* From playlists */
export const getPlayerPlaylist = state => {
  const playlistName = fromPlayer.getPlaylistName(state.player);
  return fromPlaylists.getPlaylist(state.playlists, playlistName);
}

export const getVisiblePlaylistName = state => state.visiblePlaylist

export const getVisiblePlaylist = state => {
  const visiblePlaylist = state.visiblePlaylist;
  return fromPlaylists.getPlaylist(state.playlists, visiblePlaylist);
}

export const getPlayerSongMap = state => {
  const playlist = getPlayerPlaylist(state);
  if (playlist) return fromPlaylist.getSongs(playlist);
  return null;
}

export const getPlayerSongIds = state => {
  const playlist = getPlayerPlaylist(state);
  if (playlist) return fromPlaylist.getSongIds(playlist);
  return null;
}
// Visible Playlist
export const getVisibleSongMap = state => {
  const playlist = getVisiblePlaylist(state);
  if (playlist) return fromPlaylist.getSongs(playlist);
  return null;
}

export const getVisibleSongIds = state => {
  const playlist = getVisiblePlaylist(state);
  if (playlist) return fromPlaylist.getSongIds(playlist);
  return null;
}

export const getFetchState = state => {
  const playlist = getVisiblePlaylist(state);
  if (playlist) return fromPlaylist.getFetchState(playlist);
  return null;
}

export const getNextUrlOfVisiblePlaylist = state => {
  const playlist = getVisiblePlaylist(state);
  if (playlist) return fromPlaylist.getNextUrl(playlist);
  return null;
}

/* From players */
export const getPlaylistName = state => fromPlayer.getPlaylistName(state.player)

export const getCurrentSongId = state => fromPlayer.getCurrentSongId(state.player)

export const getPlayingState = state => fromPlayer.getPlayingState(state.player)

export const getCurrentVolume = state => fromPlayer.getCurrentVolume(state.player)

export const getVolumeSeekState = state => fromPlayer.getVolumeSeekState(state.player)

export const getCurrentTime = state => fromPlayer.getCurrentTime(state.player)

export const getSeekStatus = state => fromPlayer.getSeekStatus(state.player)

export const getPlayerMode = state => fromPlayer.getPlayerMode(state.player)


export default rootReducer;
