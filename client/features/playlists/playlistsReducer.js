import * as actionTypes from 'features/playlists/playlistsActionTypes';

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

function removePlaylistFromPlaylists(state, { playlistId }) {
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
    case actionTypes.PLAYLISTS_MERGE:
      return mergePlaylists(state, action.payload);
    case actionTypes.PLAYLISTS_UPDATE:
      return updatePlaylists(state, action.payload);
    case actionTypes.PLAYLISTS_STATE_RESET:
      return resetPlaylistsState();
    case actionTypes.PLAYLISTS_PLAYLIST_DELETE:
      return removePlaylistFromPlaylists(state, action.payload);
    default:
      return state;
  }
}
