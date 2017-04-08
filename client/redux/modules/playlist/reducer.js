import { CHARTS_RECEIVED } from 'client/redux/modules/charts';
import {
  TOGGLE_PLAYLIST,
  CLEAR_PLAY_QUEUE,
  APPEND_TRACK_TO_PLAYLIST,
  CHANGE_VISIBLE_PLAYLIST_NAME,
  CHANGE_ACTIVE_PLAYLIST_NAME,
} from './types';
/* Reducer */
const initialState = {
  // The name of currently active playlist
  activePlaylistName: '',
  visiblePlaylistName: '',
  // The shuffled or modded playlist
  hidden: true,
};

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {

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

    case CHARTS_RECEIVED:
      return {
        ...state,
        [action.playlistName]: (state[action.playlistName]
                                ? [...state[action.playlistName], ...action.payload.result]
                                : [...action.payload.result]).slice(0, 50),
        // shufflePlaylist: [...state.shufflePlaylist, ...action.payload.result],
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
