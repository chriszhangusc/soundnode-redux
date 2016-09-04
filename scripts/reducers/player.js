import {PLAY_SONG, PAUSE_SONG, UPDATE_TIME, LOAD_PLAYLIST, TOGGLE_SEEK, TOGGLE_PLAY, CHANGE_SONG} from '../constants/ActionTypes';
import {SHUFFLE, REPEAT, SEQUENCIAL, LOOP} from '../constants/PlayerConstants';

const INITIAL_STATE = {
  currentTime: 0,
  volume: 50,
  song: null,
  isPlaying: false,
  playlist: null, // which playlist we are currently playing
  isSeeking: false,
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

    case CHANGE_SONG:
      return {
        ...state,
        song: {
          ...action.song
        },
      }

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

    default:
      return state;
  }
};

export default player;
