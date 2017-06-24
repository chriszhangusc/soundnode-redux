import { CHARTS_CLEAR_STATE } from 'client/features/charts/chartsConsts';
import * as types from './playlistConsts';

const initialState = {
  activePlaylistName: undefined,
  visiblePlaylistName: undefined,
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

export function updateVisiblePlaylistName(state, { visiblePlaylistName }) {
  return {
    ...state,
    visiblePlaylistName,
  };
}

export function updateActivePlaylistName(state, { activePlaylistName }) {
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
    case types.PLAYLIST_UPDATE:
      return updatePlaylist(state, action.payload);

    case types.PLAYLIST_APPEND:
      return appendToPlaylist(state, action.payload);

    case types.PLAYLIST_SHUFFLE_PLAYLIST_UPDATE:
      return updateShuffledPlaylist(state, action.payload);

    case types.PLAYLIST_SHUFFLE_PLAYLIST_CLEAR:
      return clearShufflePlaylist(state);

    case types.PLAYLIST_TOGGLE:
      return togglePlaylist(state);
    // Need to handle shuffle mode!!
    case types.APPEND_TRACK_TO_PLAYLIST:
      return appendToPlaylist(state, action.payload);

    case types.PLAYLIST_CLEAR_QUEUE:
      return {
        ...initialState,
      };

    case types.PLAYLIST_VISIBLE_PLAYLIST_NAME_CHANGE:
      return updateVisiblePlaylistName(state, action.payload);

    case types.PLAYLIST_ACTIVE_PLAYLIST_NAME_CHANGE:
      return updateActivePlaylistName(state, action.payload);

    case CHARTS_CLEAR_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
