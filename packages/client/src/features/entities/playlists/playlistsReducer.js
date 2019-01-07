import * as types from '@soundnode-redux/client/src/features/entities/playlists/playlistsActionTypes';
import merge from 'lodash/merge';

function addToPlaylist(state, { playlistId, trackId }) {
  const playlist = state[playlistId];
  return {
    ...state,
    [playlistId]: {
      ...playlist,
      tracks: playlist.tracks.concat(trackId),
    },
  };
}

function removeFromPlaylist(state, { playlistId, trackId }) {
  const playlist = state[playlistId];
  return {
    ...state,
    [playlistId]: {
      ...playlist,
      tracks: playlist.tracks.filter(id => id !== trackId),
    },
  };
}

export default function playlistsReducer(state = {}, action) {
  switch (action.type) {
    case types.PLAYLIST_TRACK_ADD:
      return addToPlaylist(state, action.payload);
    case types.PLAYLIST_TRACK_REMOVE:
      return removeFromPlaylist(state, action.payload);

    // FIXME: createReducer does not handle this...
    default:
      if (action.payload && action.payload.entities && action.payload.entities.playlists) {
        return merge({}, state, action.payload.entities.playlists);
      }
      return state;
  }
}
