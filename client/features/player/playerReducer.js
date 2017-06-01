import { PLAYLIST_CLEAR_QUEUE } from 'client/features/playlist/playlistActions';
import {
  PLAYER_SONG_PLAY,
  PLAYER_SONG_PAUSE,
  PLAYER_TIME_UPDATE,
  PLAYER_SEEK_BEGIN,
  PLAYER_SEEK_END,
  PLAYER_VOLUME_CHANGE,
  PLAYER_SONG_CHANGE,
  PLAYER_VOLUME_SEEK_BEGIN,
  PLAYER_VOLUME_SEEK_END,
  PLAYER_PLAY_MODE_CHANGE,
  PLAYER_MUTE,
  PLAYER_TIME_CLEAR,
  DEFAULT_MODE,
  INITIAL_VOLUME,
} from './playerConsts';

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
    case PLAYER_SONG_CHANGE:
      return {
        ...state,
        trackId: action.payload,
      };

    case PLAYER_SONG_PLAY:
      return {
        ...state,
        playing: true,
      };

    case PLAYER_SONG_PAUSE:
      return {
        ...state,
        playing: false,
      };

    case PLAYER_TIME_UPDATE:
      return {
        ...state,
        currentTime: action.payload,
      };

    case PLAYER_SEEK_BEGIN:
      return {
        ...state,
        seeking: true,
      };

    case PLAYER_SEEK_END:
      return {
        ...state,
        seeking: false,
      };

    case PLAYER_VOLUME_CHANGE:
      return {
        ...state,
        volume: action.payload,
      };

    case PLAYER_VOLUME_SEEK_BEGIN:
      return {
        ...state,
        volumeSeeking: true,
      };

    case PLAYER_VOLUME_SEEK_END:
      return {
        ...state,
        volumeSeeking: false,
      };

    case PLAYER_PLAY_MODE_CHANGE:
      return {
        ...state,
        mode: action.payload,
      };

    case PLAYER_MUTE:
      return {
        ...state,
        volume: 0,
      };

    case PLAYER_TIME_CLEAR:
      return {
        ...state,
        currentTime: 0,
      };
    // What?
    case PLAYLIST_CLEAR_QUEUE:
      return initialState;

    default:
      return state;
  }
}
