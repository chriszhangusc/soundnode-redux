import { CLEAR_PLAY_QUEUE } from 'client/redux/modules/playlist/actions';

import { DEFAULT_MODE, INITIAL_VOLUME } from './consts';

import {
  PLAY_SONG,
  PAUSE_SONG,
  UPDATE_TIME,
  BEGIN_SEEK,
  END_SEEK,
  CHANGE_VOLUME,
  CHANGE_SONG,
  BEGIN_VOLUME_SEEK,
  END_VOLUME_SEEK,
  CHANGE_PLAY_MODE,
  MUTE,
  CLEAR_TIME,
} from './action-types';



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

export default function playerReducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_SONG:
      return {
        ...state,
        trackId: action.payload,
      };

    case PLAY_SONG:
      return {
        ...state,
        playing: true,
      };

    case PAUSE_SONG:
      return {
        ...state,
        playing: false,
      };

    case UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    case BEGIN_SEEK:
      return {
        ...state,
        seeking: true,
      };

    case END_SEEK:
      return {
        ...state,
        seeking: false,
      };

    case CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };

    case BEGIN_VOLUME_SEEK:
      return {
        ...state,
        volumeSeeking: true,
      };

    case END_VOLUME_SEEK:
      return {
        ...state,
        volumeSeeking: false,
      };

    case CHANGE_PLAY_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    case MUTE:
      return {
        ...state,
        volume: 0,
      };

    case CLEAR_TIME:
      return {
        ...state,
        currentTime: 0,
      };

    // What?
    case CLEAR_PLAY_QUEUE:
      return initialState;

    default:
      return state;
  }
}

