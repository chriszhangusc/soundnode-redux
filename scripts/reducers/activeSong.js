import * as types from '../constants/ActionTypes';
const INITIAL_STATE = {
  isPlaying: false,
  song: null,
};

const activeSong = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PLAY_SONG:
      return {
        ...state,
        isPlaying: true,
        song: {
          ...action.song
        },
      };
    case types.PAUSE_SONG:
      return {
        ...state,
        isPlaying: false,
      }
    default:
      return state;
  }
};

export default activeSong;
