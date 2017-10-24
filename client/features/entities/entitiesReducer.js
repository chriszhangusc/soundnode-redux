import { combineReducers } from 'redux';
import tracksReducer from 'features/entities/tracks/tracksReducer';
import usersReducer from 'features/entities/users/usersReducer';
import playlistsReducer from 'features/entities/playlists/playlistsReducer';
import commentsReducer from 'features/entities/comments/commentsReducer';
// import { ENTITIES_MERGE, PLAYLIST_TRACK_ADD } from './entitiesActionTypes';

// const INITIAL_STATE = {
//   tracks: {},
//   users: {},
//   comments: {},
//   playlists: {},
// };

// export function mergeEntities(state, { entities }) {
//   return merge({}, state, entities);
// }

// export default function entitiesReducer(state = INITIAL_STATE, action) {
//   // Implicit merge
//   // if (action.payload && action.payload.entities) {
//   //   // merge provided by lodash will recursively merge objects.
//   //   // Also see: http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html
//   //   return merge({}, state, action.payload.entities);
//   // }

//   switch (action.type) {
//     // Explicit merge
//     case ENTITIES_MERGE:
//       return mergeEntities(state, action.payload);
//     case PLAYLIST_TRACK_ADD:
//       return addToPlaylist(state, action.payload);
//     default:
//       return state;
//   }
// }

const entitiesReducer = combineReducers({
  tracks: tracksReducer,
  users: usersReducer,
  playlists: playlistsReducer,
  comments: commentsReducer,
});

export default entitiesReducer;
