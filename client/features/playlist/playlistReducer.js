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

// ????
export function receiveCharts(state, { playlistName, result }) {
  const playlist = state[playlistName];
  return {
    ...state,
    [playlistName]: playlist ? uniq([...playlist, ...result]) : [...result],
  };
}

export function updateShufflePlaylist(state, { shufflePlaylist }) {
  return {
    ...state,
    shufflePlaylist,
  };
}

export function clearShufflePlaylist(state) {
  return {
    ...state,
    shufflePlaylist: [],
  };
}

export function togglePlaylist(state) {
  return {
    ...state,
    hidden: !state.hidden,
  };
}

export function appendToPlaylist(state, { trackId }) {
  return {
    ...state,
    playlist: [...state.playlist, trackId],
  };
}

export function changeVisiblePlaylistName(state, { visiblePlaylistName }) {
  return {
    ...state,
    visiblePlaylistName,
  };
}

export function changeActivePlaylistName(state, { activePlaylistName }) {
  return {
    ...state,
    activePlaylistName,
  };
}

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SHUFFLE_PLAYLIST_UPDATE:
      return updateShufflePlaylist(state, action.payload);

    case PLAYLIST_SHUFFLE_PLAYLIST_CLEAR:
      return clearShufflePlaylist(state);

    case PLAYLIST_TOGGLE:
      return togglePlaylist(state);
    // Need to handle shuffle mode!!
    case APPEND_TRACK_TO_PLAYLIST:
      return appendToPlaylist(state, action.payload);

    case PLAYLIST_CLEAR_QUEUE:
      return {
        ...initialState,
      };

    case CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };

    case CHARTS_RECEIVE:
      return receiveCharts(state, action.payload);

    case PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE:
      return changeVisiblePlaylistName(state, action.payload);

    case PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE:
      return changeActivePlaylistName(state, action.payload);

    default:
      return state;
  }
}
