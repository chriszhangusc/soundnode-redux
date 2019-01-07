import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from './addToPlaylistActionTypes';

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

export default createReducer(initialState, {
  [types.PLAYLIST_FILTER_TEXT_UPDATE]: updateFilterText,
  [types.PLAYLIST_REQUEST_QUEUE_ADD]: addToRequestQueue,
  [types.PLAYLIST_REQUEST_QUEUE_REMOVE]: removeFromRequestQueue,
});
