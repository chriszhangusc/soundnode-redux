import * as actionTypes from 'features/playlists/playlistsActionTypes';

/* Reducer */
const initialState = {
  playlistIds: [],
};

export function mergePlaylists(state, { playlistIds }) {
  return {
    ...state,
    playlistIds: [...state.playlistIds, ...playlistIds],
  };
}

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PLAYLISTS_MERGE:
      return mergePlaylists(state, action.payload);
    default:
      return state;
  }
}
