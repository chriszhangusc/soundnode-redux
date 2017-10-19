import * as actionTypes from './playerActionTypes';
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
  };
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PLAYER_ACTIVE_TRACK_REMOVE:
      return removeActiveTrack(state);

    case actionTypes.PLAYER_ACTIVE_TRACK_ID_UPDATE:
      return updateActiveTrackId(state, action.payload);

    case actionTypes.PLAYER_SONG_PLAY:
      return playSong(state);

    case actionTypes.PLAYER_SONG_PAUSE:
      return pauseSong(state);

    case actionTypes.PLAYER_SONG_LOAD:
      return loadSong(state);

    case actionTypes.PLAYER_TIME_UPDATE:
      return updateCurrentTime(state, action.payload);

    case actionTypes.PLAYER_SEEK_BEGIN:
      return startSeek(state);

    case actionTypes.PLAYER_SEEK_END:
      return endSeek(state);

    case actionTypes.PLAYER_VOLUME_UPDATE:
      return updateVolume(state, action.payload);

    case actionTypes.PLAYER_VOLUME_SEEK_BEGIN:
      return startVolumeSeek(state);

    case actionTypes.PLAYER_VOLUME_SEEK_END:
      return endVolumeSeek(state);

    case actionTypes.PLAYER_PLAY_MODE_UPDATE:
      return updatePlayMode(state, action.payload);

    case actionTypes.PLAYER_MUTE:
      return mute(state);

    case actionTypes.PLAYER_TIME_RESET:
      return resetTime(state);

    default:
      return state;
  }
}
