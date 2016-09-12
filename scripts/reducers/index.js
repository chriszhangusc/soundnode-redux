import playlists from './playlists';
import player from './player';
import { combineReducers } from 'redux';
import { generateStreamUrl } from '../utils/SongUtils';
import * as fromPlaylists from './playlists';
import * as fromPlayer from './player';
import { createSelector } from 'reselect';
/* Reducers */
const rootReducer = combineReducers({
  playlists,
  player,
});
/* Pure state selectors */

/* From playlists */
export const getPlaylists = state => state.playlists

export const getCurrentPlaylist = (state) => {
  const playlistName = getPlaylistName(state);
  const playlists = getPlaylists(state);
  if (playlists) return playlists[playlistName];
  return null;
}

export const getSongMap = state => {
  const playlist = getCurrentPlaylist(state);
  if (playlist) return playlist.songs;
  return null;
}

export const getSongIds = state => {
  const playlist = getCurrentPlaylist(state);
  if (playlist) return playlist.songIds;
  return null;
}

export const getFetchState = state => {
  const playlist = getCurrentPlaylist(state);
  if (playlist) return playlist.isFetching;
  return null;
}

/* From players */
export const getPlaylistName = (state) => fromPlayer.getPlaylistName(state.player)

export const getCurrentSongId = state => fromPlayer.getCurrentSongId(state.player)

export const getPlayingState = (state) => fromPlayer.getPlayingState(state.player)

export const getCurrentVolume = (state) => fromPlayer.getCurrentVolume(state.player)

export const getVolumeSeekState = (state) => fromPlayer.getVolumeSeekState(state.player)

export const getCurrentTime = (state) => fromPlayer.getCurrentTime(state.player)

export const getSeekStatus = (state) => fromPlayer.getSeekStatus(state.player)

export const getPlayerMode = (state) => fromPlayer.getPlayerMode(state.player)


export default rootReducer;
