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

/* Combined Selectors */
export const getSongsAsArray = (state, genre) => fromPlaylists.getSongsAsArray(state.playlists, genre)
export const getFetchState = (state) => fromPlaylists.getFetchState(state.playlists, genre);

export const getCurrentSong = (state) => {
  const currentPlaylist = fromPlayer.getCurrentPlaylist(state.player);
  const currentSongId = fromPlayer.getCurrentSongId(state.player);
  return fromPlaylists.getSongByIdAndPlaylist(state.playlists, currentSongId, currentPlaylist);
};

export const getStreamUrl = (state) => {
  const currentSong = getCurrentSong(state);
  return generateStreamUrl(currentSong);
};
export const getPlaylist = (state) => fromPlayer.getPlaylist(state.player);
export const getPlayerState = (state) => fromPlayer.getPlayerState(state.player)

export const getDuration = (state) => {
  const currentSong = getCurrentSong(state);
  let duration = null;
  if (currentSong)
    duration = currentSong.duration / 1000.0 // convert ms to s
  return duration
};

export const getCurrentVolume = (state) => fromPlayer.getCurrentVolume(state.player)

export const getVolumeSeekState = (state) => fromPlayer.getVolumeSeekState(state.player)

export const getCurrentTime = (state) => fromPlayer.getCurrentTime(state.player)

export const getSeekStatus = (state) => fromPlayer.getSeekStatus(state.player)

export const getPlayerMode = (state) => fromPlayer.getPlayerMode(state.player)

export default rootReducer;
