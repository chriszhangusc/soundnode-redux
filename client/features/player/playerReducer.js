import { createReducer } from 'common/utils/reducerUtils';
import * as types from './playerActionTypes';
import { DEFAULT_MODE } from './playerConsts';

/* Player Reducer */
const initialState = {
  currentTime: 0,
  volume: 1.0,
  loading: false, // Loading song into player
  playing: false,
  seeking: false,
  volumeSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE,
  activeTrackId: null,
};

export function updateActiveTrackId(state, { activeTrackId }) {
  return {
    ...state,
    activeTrackId,
  };
}

export function playSong(state) {
  return {
    ...state,
    playing: true,
    loading: false,
  };
}

export function loadSong(state) {
  return {
    ...state,
    loading: true,
  };
}

export function pauseSong(state) {
  return {
    ...state,
    playing: false,
    loading: false,
  };
}

export function updateCurrentTime(state, { currentTime }) {
  return {
    ...state,
    currentTime,
  };
}

export function startSeek(state) {
  return {
    ...state,
    seeking: true,
  };
}

export function endSeek(state) {
  return {
    ...state,
    seeking: false,
  };
}

export function updateVolume(state, { volume }) {
  return {
    ...state,
    volume,
  };
}

export function startVolumeSeek(state) {
  return {
    ...state,
    volumeSeeking: true,
  };
}

export function endVolumeSeek(state) {
  return {
    ...state,
    volumeSeeking: false,
  };
}

export function updatePlayMode(state, { mode }) {
  return {
    ...state,
    mode,
  };
}

export function mute(state) {
  return {
    ...state,
    volume: 0,
  };
}

export function resetTime(state) {
  return {
    ...state,
    currentTime: 0,
  };
}

export function removeActiveTrack(state) {
  return {
    ...state,
    playing: false,
    activeTrackId: null,
    currentTime: 0,
    duration: 0,
  };
}

export default createReducer(initialState, {
  [types.PLAYER_ACTIVE_TRACK_REMOVE]: removeActiveTrack,
  [types.PLAYER_ACTIVE_TRACK_REMOVE]: updateActiveTrackId,
  [types.PLAYER_SONG_PLAY]: playSong,
  [types.PLAYER_SONG_PAUSE]: pauseSong,
  [types.PLAYER_SONG_LOAD]: loadSong,
  [types.PLAYER_TIME_UPDATE]: updateCurrentTime,
  [types.PLAYER_SEEK_BEGIN]: startSeek,
  [types.PLAYER_SEEK_END]: endSeek,
  [types.PLAYER_VOLUME_UPDATE]: updateVolume,
  [types.PLAYER_VOLUME_SEEK_BEGIN]: startVolumeSeek,
  [types.PLAYER_VOLUME_SEEK_END]: endVolumeSeek,
  [types.PLAYER_PLAY_MODE_UPDATE]: updatePlayMode,
  [types.PLAYER_MUTE]: mute,
  [types.PLAYER_TIME_RESET]: resetTime,
});
