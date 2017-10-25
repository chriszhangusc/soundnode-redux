import * as types from 'features/playlists/playlistsActionTypes';

/* Reducer */
const initialState = {
  playlistIds: [],
};

function mergePlaylists(state, { playlistIds }) {
  return {
    ...state,
    playlistIds: [...state.playlistIds, ...playlistIds],
  };
}

function updatePlaylists(state, { playlistIds }) {
  return {
    ...state,
    playlistIds: [...playlistIds],
  };
}

function removePlaylist(state, { playlistId }) {
  return {
    ...state,
    playlistIds: state.playlistIds.filter(id => id !== playlistId),
  };
}

function resetPlaylistsState() {
  return {
    ...initialState,
  };
}

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAYLISTS_MERGE:
      return mergePlaylists(state, action.payload);
    case types.PLAYLISTS_UPDATE:
      return updatePlaylists(state, action.payload);
    case types.PLAYLISTS_STATE_RESET:
      return resetPlaylistsState();
    case types.PLAYLISTS_PLAYLIST_DELETE:
      return removePlaylist(state, action.payload);
    default:
      return state;
  }
}
