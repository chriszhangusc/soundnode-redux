// @flow
import type { Action } from 'common/flowTypes';

import {
  PLAYER_SONG_PLAY,
  PLAYER_SONG_PAUSE,
  PLAYER_TIME_UPDATE,
  PLAYER_SEEK_BEGIN,
  PLAYER_SEEK_END,
  PLAYER_VOLUME_CHANGE,
  PLAYER_SONG_CHANGE,
  PLAYER_VOLUME_SEEK_BEGIN,
  PLAYER_VOLUME_SEEK_END,
  PLAYER_PLAY_MODE_CHANGE,
  PLAYER_MUTE,
  PLAYER_TIME_CLEAR,
  DEFAULT_MODE,
  INITIAL_VOLUME,
} from './playerConsts';

type PlayerState = {
  duration: number,
  currentTime: number,
  volume: number,
  playing: boolean,
  seeking: false,
  volumeSeeking: false,
  mode: string,
  trackId: ?number,
};

/* Player Reducer */
const initialState = {
  currentTime: 0,
  volume: INITIAL_VOLUME,
  playing: false,
  seeking: false,
  volumeSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE,
  trackId: null,
};

export function changeSong(state: PlayerState, { trackId }: { trackId: ?number }) {
  return {
    ...state,
    trackId,
  };
}

export function playSong(state: PlayerState) {
  return {
    ...state,
    playing: true,
  };
}

export function pauseSong(state: PlayerState) {
  return {
    ...state,
    playing: false,
  };
}

export function updateCurrentTime(state: PlayerState, { currentTime }: { currentTime: number }) {
  return {
    ...state,
    currentTime,
  };
}

export function startSeek(state: PlayerState) {
  return {
    ...state,
    seeking: true,
  };
}

export function endSeek(state: PlayerState) {
  return {
    ...state,
    seeking: false,
  };
}

export function updateVolume(state: PlayerState, { volume }: { volume: number }) {
  return {
    ...state,
    volume,
  };
}

export function startVolumeSeek(state: PlayerState) {
  return {
    ...state,
    volumeSeeking: true,
  };
}

export function endVolumeSeek(state: PlayerState) {
  return {
    ...state,
    volumeSeeking: false,
  };
}

export function updatePlayMode(state: PlayerState, { mode }: { mode: string }) {
  return {
    ...state,
    mode,
  };
}

export function mute(state: PlayerState) {
  return {
    ...state,
    volume: 0,
  };
}

export function clearTime(state: PlayerState) {
  return {
    ...state,
    currentTime: 0,
  };
}

export default function playerReducer(state: PlayerState = initialState, action: Action) {
  switch (action.type) {
    case PLAYER_SONG_CHANGE:
      return changeSong(state, action.payload);

    case PLAYER_SONG_PLAY:
      return playSong(state);

    case PLAYER_SONG_PAUSE:
      return pauseSong(state);

    case PLAYER_TIME_UPDATE:
      return updateCurrentTime(state, action.payload);

    case PLAYER_SEEK_BEGIN:
      return startSeek(state);

    case PLAYER_SEEK_END:
      return endSeek(state);

    case PLAYER_VOLUME_CHANGE:
      return updateVolume(state, action.payload);

    case PLAYER_VOLUME_SEEK_BEGIN:
      return startVolumeSeek(state);

    case PLAYER_VOLUME_SEEK_END:
      return endVolumeSeek(state);

    case PLAYER_PLAY_MODE_CHANGE:
      return updatePlayMode(state, action.payload);

    case PLAYER_MUTE:
      return mute(state);

    case PLAYER_TIME_CLEAR:
      return clearTime(state);

    default:
      return state;
  }
}
