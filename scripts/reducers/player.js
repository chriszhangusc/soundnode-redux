import * as ActionTypes from '../constants/ActionTypes';
import { INITIAL_VOLUME, DEFAULT_MODE } from '../constants/PlayerConstants';

/* Player Reducers */
const INITIAL_STATE = {
  currentTime: 0,
  volume: INITIAL_VOLUME,
  songId: null,
  isPlaying: false,
  playlist: null, // which playlist we are currently playing
  isSeeking: false,
  volumeIsSeeking: false,
  duration: 0,
  mode: DEFAULT_MODE
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.LOAD_PLAYER_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      };

    case ActionTypes.PLAY_SONG:
      return {
        ...state,
        isPlaying: true
      };

    case ActionTypes.PAUSE_SONG:
      return {
        ...state,
        isPlaying: false
      };

    case ActionTypes.CHANGE_DURATION:
      return {
        ...state,
        duration: action.payload
      };

    case ActionTypes.CHANGE_SONG:
      return {
        ...state,
        songId: action.payload
      };

    case ActionTypes.UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload
      };

    case ActionTypes.BEGIN_SEEK:
      return {
        ...state,
        isSeeking: true
      };

    case ActionTypes.END_SEEK:
      return {
        ...state,
        isSeeking: false
      };

    case ActionTypes.CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload
      };

    case ActionTypes.BEGIN_VOLUME_SEEK:
      return {
        ...state,
        volumeIsSeeking: true
      };

    case ActionTypes.END_VOLUME_SEEK:
      return {
        ...state,
        volumeIsSeeking: false
      };

    case ActionTypes.SWITCH_MODE:
      return {
        ...state,
        mode: action.payload
      };

    case ActionTypes.MUTE:
      return {
        ...state,
        volume: 0
      };

    case ActionTypes.CLEAR_TIME:
      return {
        ...state,
        currentTime: 0
      }

    default:
      return state;
  }
};

export default player;


/* Player Selectors */
export const getCurrentSongId = state => state.songId
export const getPlaylistName = state => state.playlist
export const getPlayingState = state => state.isPlaying
export const getCurrentTime = state => state.currentTime
export const getSeekState = state => state.isSeeking
export const getPlayerMode = state => state.mode
export const getVolumeSeekState = state => state.volumeIsSeeking
export const getCurrentVolume = state => state.volume
