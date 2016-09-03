import {PLAY_SONG, PAUSE_SONG, UPDATE_TIME, LOAD_PLAYLIST, TOGGLE_SEEK} from '../constants/ActionTypes';

const INITIAL_STATE = {
  currentTime: 0,
  volume: 50,
  song: null,
  isPlaying: false,
  playlist: null, // which playlist we are currently playing
  isSeeking: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case LOAD_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist
      };

    case PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
        song: {
          ...action.song
        },
      };

    case PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
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

    default:
      return state;
  }
};

export default player;
