import {
  PLAYLIST_FILTER_TEXT_UPDATE,
  PLAYLIST_REQUEST_QUEUE_ADD,
  PLAYLIST_REQUEST_QUEUE_REMOVE,
} from './addToPlaylistActionTypes';

const initialState = {
  filterText: '',
  requestQueue: [],
};

function updateFilterText(state, { filterText }) {
  return {
    ...state,
    filterText,
  };
}

function addToRequestQueue(state, { playlistId }) {
  return {
    ...state,
    requestQueue: [...state.requestQueue, playlistId],
  };
}

function removeFromRequestQueue(state, { playlistId }) {
  return {
    ...state,
    requestQueue: state.requestQueue.filter(id => id !== playlistId),
  };
}

export default function addToPlaylistReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_FILTER_TEXT_UPDATE:
      return updateFilterText(state, action.payload);
    case PLAYLIST_REQUEST_QUEUE_ADD:
      return addToRequestQueue(state, action.payload);
    case PLAYLIST_REQUEST_QUEUE_REMOVE:
      return removeFromRequestQueue(state, action.payload);
    default:
      return state;
  }
}
