import { CHARTS_CLEAR_STATE } from 'client/features/charts/chartsConsts';
import {
  PLAYLIST_TOGGLE,
  PLAYLIST_CLEAR_QUEUE,
  APPEND_TRACK_TO_PLAYLIST,
  PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE,
  PLAYLIST_SHUFFLE_PLAYLIST_UPDATE,
  PLAYLIST_SHUFFLE_PLAYLIST_CLEAR,
  PLAYLIST_UPDATE,
  PLAYLIST_APPEND,
} from './playlistConsts';

const initialState = {
  activePlaylistName: '',
  visiblePlaylistName: '',
  hidden: true,
  shuffledPlaylist: [],
};

export function appendVisiblePlaylist(state, { newPlaylist }) {
  return {
    ...state,
    visiblePlaylist: [...state.visiblePlaylist, ...newPlaylist],
  };
}

export function updateVisiblePlaylist(state, { visiblePlaylist }) {
  return {
    ...state,
    [state.visiblePlaylistName]: [...visiblePlaylist],
  };
}

export function updateShuffledPlaylist(state, { shuffledPlaylist }) {
  return {
    ...state,
    shuffledPlaylist: [...shuffledPlaylist],
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

export function updatePlaylist(state, { playlistName, trackIds }) {
  return {
    ...state,
    [playlistName]: [...trackIds],
  };
}

export function appendToPlaylist(state, { playlistName, trackIds }) {
  const newPlaylist = state[playlistName] ? [...state[playlistName], ...trackIds] : [...trackIds];
  return {
    ...state,
    [playlistName]: newPlaylist,
  };
}

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_UPDATE:
      return updatePlaylist(state, action.payload);

    case PLAYLIST_APPEND:
      return appendToPlaylist(state, action.payload);

    case PLAYLIST_SHUFFLE_PLAYLIST_UPDATE:
      return updateShuffledPlaylist(state, action.payload);

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

    case PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE:
      return changeVisiblePlaylistName(state, action.payload);

    case PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE:
      return changeActivePlaylistName(state, action.payload);

    default:
      return state;
  }
}
