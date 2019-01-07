import { ENTITIES_MERGE } from './entitiesActionTypes';

export function mergeEntities(entities) {
  return {
    type: ENTITIES_MERGE,
    payload: {
      entities,
    },
  };
}
