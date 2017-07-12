// @flow

import * as actionTypes from './playerActionTypes';
import { LOOP, SHUFFLE, REPEAT } from './playerConsts';

export type PlayMode = LOOP | SHUFFLE | REPEAT;

export type PlayerState = {
  duration: number,
  currentTime: number,
  volume: number,
  playing: boolean,
  seeking: false,
  volumeSeeking: false,
  mode: string,
  trackId: ?number,
};

export type BeginSeekAction = { type: actionTypes.PLAYER_SEEK_BEGIN };
export type EndSeekAction = { type: actionTypes.PLAYER_SEEK_END };
export type PlaySongAction = { type: actionTypes.PLAYER_SONG_PLAY };
export type PauseSongAction = { type: actionTypes.PLAYER_SONG_PAUSE };
export type BeginVolumeSeekAction = { type: actionTypes.PLAYER_VOLUME_SEEK_BEGIN };
export type EndVolumeSeekAction = { type: actionTypes.PLAYER_VOLUME_SEEK_END };
export type MuteAction = { type: actionTypes.PLAYER_MUTE };
export type ResetTimeAction = { type: actionTypes.PLAYER_TIME_RESET };
export type UpdateActiveTrackIdAction = {
  type: actionTypes.PLAYER_ACTIVE_TRACK_ID_UPDATE,
  payload: {
    activeTrackId: number,
  },
};

export type UpdateTimeAction = {
  type: actionTypes.PLAYER_TIME_UPDATE,
  payload: {
    currentTime: number,
  },
};

export type UpdateVolumeAction = {
  type: actionTypes.PLAYER_VOLUME_UPDATE,
  payload: {
    volume: number,
  },
};

export type ChangePlayModeAction = {
  type: actionTypes.PLAYER_PLAY_MODE_CHANGE,
  payload: {
    mode: PlayMode,
  },
};

export type PlayerAction =
  | BeginSeekAction
  | EndSeekAction
  | PlaySongAction
  | PauseSongAction
  | BeginVolumeSeekAction
  | EndVolumeSeekAction
  | MuteAction
  | ResetTimeAction
  | UpdateActiveTrackIdAction
  | UpdateTimeAction
  | UpdateVolumeAction
  | ChangePlayModeAction;
