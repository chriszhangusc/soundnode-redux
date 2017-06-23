import { ENTITIES_MERGE } from './entitiesConsts';

export function mergeEntities(entities) {
  return {
    type: ENTITIES_MERGE,
    payload: {
      entities,
    },
  };
}
