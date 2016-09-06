import * as ActionTypes from '../constants/ActionTypes';
import {SHUFFLE, REPEAT, SEQUENCIAL, LOOP, INITIAL_VOLUME} from '../constants/PlayerConstants';

const INITIAL_STATE = {
  currentTime: 0,
  volume: INITIAL_VOLUME,
  song: null,
  isPlaying: false,
  playlist: null, // which playlist we are currently playing
  isSeeking: false,
  volumeIsSeeking: false,
  duration: 0,
  mode: SEQUENCIAL,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.LOAD_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist
      };

    case ActionTypes.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };

    case ActionTypes.PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
      };

    case ActionTypes.PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
      };
    case ActionTypes.CHANGE_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case ActionTypes.CHANGE_SONG:
      return {
        ...state,
        song: {
          ...action.song
        },
      };

    case ActionTypes.UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };

    case ActionTypes.TOGGLE_SEEK:
      return {
        ...state,
        isSeeking: !state.isSeeking,
      };

    case ActionTypes.BEGIN_SEEK:
      return {
        ...state,
        isSeeking: true,
      };

    case ActionTypes.END_SEEK:
      return {
        ...state,
        isSeeking: false,
      };

    case ActionTypes.CHANGE_VOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    case ActionTypes.BEGIN_VOLUME_SEEK:
      return {
        ...state,
        volumeIsSeeking: true,
      };
    case ActionTypes.END_VOLUME_SEEK:
      return {
        ...state,
        volumeIsSeeking: false,
      };
    default:
      return state;
  }
};

export default player;
