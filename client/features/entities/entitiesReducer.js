import merge from 'lodash/merge';
import { ENTITIES_MERGE } from './entitiesConsts';

const INITIAL_STATE = {
  tracks: {},
  users: {},
  comments: {},
  playlists: {},
};

export function mergeEntities(state, { entities }) {
  return merge({}, state, entities);
}

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
    default:
      return state;
  }
}
