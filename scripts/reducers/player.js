import {PLAY_SONG, PAUSE_SONG, UPDATE_TIME, LOAD_PLAYLIST, TOGGLE_SEEK, BEGIN_SEEK, CHANGE_DURATION, END_SEEK, TOGGLE_PLAY, CHANGE_SONG} from '../constants/ActionTypes';
import {SHUFFLE, REPEAT, SEQUENCIAL, LOOP} from '../constants/PlayerConstants';

const INITIAL_STATE = {
  currentTime: 0,
  volume: 50,
  song: null,
  isPlaying: false,
  playlist: null, // which playlist we are currently playing
  isSeeking: false,
  duration: 0,
  mode: SEQUENCIAL,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LOAD_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist
      };

    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };

    case PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
      };

    case PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
      };
    case CHANGE_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case CHANGE_SONG:
      return {
        ...state,
        song: {
          ...action.song
        },
      };

    case UPDATE_TIME:
      return {
        ...state,
        currentTime: action.currentTime,
      };

    case TOGGLE_SEEK:
      return {
        ...state,
        isSeeking: !state.isSeeking,
      };

    case BEGIN_SEEK:
      return {
        ...state,
        isSeeking: true,
      };

    case END_SEEK:
      return {
        ...state,
        isSeeking: false,
      };

    default:
      return state;
  }
};

export default player;
