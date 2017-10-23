import { UPDATE_PLAYLIST } from './addToPlaylistActionTypes';

const initialState = {
  playlistIds: [],
  filterText: '',
};

export default function addToPlaylistReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlistIds: action.payload.playlistIds,
      };
    default:
      return state;
  }
}
