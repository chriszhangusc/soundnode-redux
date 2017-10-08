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

function resetPlaylistsState() {
  return {
    ...initialState,
  };
}

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PLAYLISTS_MERGE:
      return mergePlaylists(state, action.payload);
    case actionTypes.PLAYLISTS_STATE_RESET:
      return resetPlaylistsState();
    default:
      return state;
  }
}
