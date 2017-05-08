import { CHARTS_RECEIVE } from 'client/features/charts/chartsConsts';
import {
  TOGGLE_PLAYLIST,
  CLEAR_PLAY_QUEUE,
  APPEND_TRACK_TO_PLAYLIST,
  CHANGE_VISIBLE_PLAYLIST_NAME,
  CHANGE_ACTIVE_PLAYLIST_NAME,
  UPDATE_SHUFFLE_PLAYLIST,
  CLEAR_SHUFFLE_PLAYLIST,
} from './playlistConsts';

/* Reducer */
const initialState = {
  activePlaylistName: '',
  visiblePlaylistName: '',
  // The shuffled or modded playlist
  hidden: true,
  shufflePlaylist: [],
};

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHUFFLE_PLAYLIST:
      return {
        ...state,
        shufflePlaylist: [...action.payload],
      };

    case CLEAR_SHUFFLE_PLAYLIST:
      return {
        ...state,
        shufflePlaylist: [],
      };

    case TOGGLE_PLAYLIST:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case CLEAR_PLAY_QUEUE:
      return initialState;
    // Need to handle shuffle mode!!
    case APPEND_TRACK_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };

    case CHARTS_RECEIVE:
      return {
        ...state,
        [action.payload.playlistName]: (state[action.payload.playlistName]
          ? [...state[action.payload.playlistName], ...action.payload.normalized.result]
          : [...action.payload.normalized.result]).slice(0, 50),
      };

    case CHANGE_VISIBLE_PLAYLIST_NAME:
      return {
        ...state,
        visiblePlaylistName: action.payload,
      };

    case CHANGE_ACTIVE_PLAYLIST_NAME:
      return {
        ...state,
        activePlaylistName: action.payload,
      };

    default:
      return state;
  }
}
