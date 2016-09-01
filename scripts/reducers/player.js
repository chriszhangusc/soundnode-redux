import {PLAY_SONG, PAUSE_SONG, UPDATE_TIME} from '../constants/ActionTypes';

const INITIAL_STATE = {
  currentTime: 0,
  duration: 0,
  volume: 50,
  song: null,
  isPlaying: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

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

    default:
      return state;
  }
};

export default player;
