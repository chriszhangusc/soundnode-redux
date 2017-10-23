import { PLAYLIST_FILTER_TEXT_UPDATE } from './addToPlaylistActionTypes';

const initialState = {
  filterText: '',
};

export default function addToPlaylistReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_FILTER_TEXT_UPDATE:
      return {
        ...state,
        filterText: action.payload.filterText,
      };
    default:
      return state;
  }
}
