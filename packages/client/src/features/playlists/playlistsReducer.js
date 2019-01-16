import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from '@soundnode-redux/client/src/features/playlists/playlistsActionTypes';

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

export default createReducer(initialState, {
  [types.PLAYLISTS_MERGE]: mergePlaylists,
  [types.PLAYLISTS_UPDATE]: updatePlaylists,
  [types.PLAYLISTS_PLAYLIST_DELETE]: removePlaylist,
  [types.PLAYLISTS_STATE_RESET]: resetPlaylistsState,
});
