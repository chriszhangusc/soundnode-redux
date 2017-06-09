import uniq from 'lodash/uniq';
import { CHARTS_RECEIVE, CHARTS_CLEAR_STATE } from 'client/features/charts/chartsConsts';
import {
  PLAYLIST_TOGGLE,
  PLAYLIST_CLEAR_QUEUE,
  APPEND_TRACK_TO_PLAYLIST,
  PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
} from './playlistConsts';

/* Reducer */
const initialState = {
  activePlaylistName: '',
  visiblePlaylistName: '',
  // The shuffled or modded playlist
  hidden: true,
  shufflePlaylist: [],
};

function receiveCharts(state, action) {
  const playlist = state[action.payload.playlistName];
  return {
    ...state,
    [action.payload.playlistName]: (playlist
      ? uniq([...playlist, ...action.payload.result])
      : [...action.payload.result]).slice(0, 50),
  };
}

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SHUFFLE_PLAYLIST_UPDATE:
      return {
        ...state,
        shufflePlaylist: [...action.payload],
      };

    case PLAYLIST_SHUFFLE_PLAYLIST_CLEAR:
      return {
        ...state,
        shufflePlaylist: [],
      };

    case PLAYLIST_TOGGLE:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case PLAYLIST_CLEAR_QUEUE:
      return initialState;
    // Need to handle shuffle mode!!
    case APPEND_TRACK_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };

    case CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };

    case CHARTS_RECEIVE:
      return receiveCharts(state, action);

    case PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE:
      return {
        ...state,
        visiblePlaylistName: action.payload,
      };

    case PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE:
      return {
        ...state,
        activePlaylistName: action.payload,
      };

    default:
      return state;
  }
}

