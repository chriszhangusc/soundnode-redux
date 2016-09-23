import { fromJS } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';
import { INITIAL_VOLUME, DEFAULT_MODE } from '../constants/PlayerConstants';

/* Player Reducers */
const INITIAL_STATE = fromJS({
  currentTime: 0,
  volume: INITIAL_VOLUME,
  songId: null,
  isPlaying: false,
  isSeeking: false,
  volumeIsSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE
});

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.PLAY_SONG:
      return state.set('isPlaying', true);

    case ActionTypes.PAUSE_SONG:
      return state.set('isPlaying', false);

    case ActionTypes.CHANGE_DURATION:
      return state.set('duration', action.payload);

    case ActionTypes.CHANGE_SONG:
      return state.set('songId', action.payload);

    case ActionTypes.UPDATE_TIME:
      return state.set('currentTime', action.payload);

    case ActionTypes.BEGIN_SEEK:
      return state.set('isSeeking', true);

    case ActionTypes.END_SEEK:
      return state.set('isSeeking', false);

    case ActionTypes.CHANGE_VOLUME:
      return state.set('volume', action.payload);

    case ActionTypes.BEGIN_VOLUME_SEEK:
      return state.set('volumeIsSeeking', true);

    case ActionTypes.END_VOLUME_SEEK:
      return state.set('volumeIsSeeking', true);

    case ActionTypes.SWITCH_MODE:
      return state.set('mode', action.payload);

    case ActionTypes.MUTE:
      return state.set('volume', 0);

    case ActionTypes.CLEAR_TIME:
      return state.set('currentTime', 0);

    default:
      return state;
  }
};

export default player;


/* Player Selectors */
export const getCurrentSongId = state => state.get('songId');
export const getPlayingState = state => state.get('isPlaying');
export const getCurrentTime = state => state.get('currentTime');
export const getSeekState = state => state.get('isSeeking');
export const getPlayerMode = state => state.get('mode');
export const getVolumeSeekState = state => state.get('volumeIsSeeking');
export const getCurrentVolume = state => state.get('volume');
