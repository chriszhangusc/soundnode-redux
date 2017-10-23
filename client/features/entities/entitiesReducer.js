import merge from 'lodash/merge';
import { ENTITIES_MERGE, PLAYLIST_TRACK_ADD } from './entitiesActionTypes';

const INITIAL_STATE = {
  tracks: {},
  users: {},
  comments: {},
  playlists: {},
};

export function mergeEntities(state, { entities }) {
  return merge({}, state, entities);
}

export function addToPlaylist(state, { playlistId, trackId }) {
  const playlist = state.playlists[playlistId];
  return {
    ...state,
    playlists: {
      ...state.playlists,
      [playlistId]: {
        ...playlist,
        tracks: playlist.tracks.concat(trackId),
      },
    },
  };
}

// export function removeTrackFromPlaylist(state, { playlistId, trackId }) {
//   const playlist = state.playlists[playlistId];
//   return {
//     ...state,
//   };
// }

export default function entitiesReducer(state = INITIAL_STATE, action) {
  // Implicit merge
  // if (action.payload && action.payload.entities) {
  //   // merge provided by lodash will recursively merge objects.
  //   // Also see: http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html
  //   return merge({}, state, action.payload.entities);
  // }

  switch (action.type) {
    // Explicit merge
    case ENTITIES_MERGE:
      return mergeEntities(state, action.payload);
    case PLAYLIST_TRACK_ADD:
      return addToPlaylist(state, action.payload);
    case 'PLAYLIST_TRACK_REMOVE':
      return removeTrackFromPlaylist(state, action.payload);
    default:
      return state;
  }
}
