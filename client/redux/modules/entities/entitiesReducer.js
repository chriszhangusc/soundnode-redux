import merge from 'lodash/merge';

const INITIAL_STATE = {
  tracks: {},
  users: {},
  comments: {},
};

/**
 * The entities reducer which iterate through all our eneities tables,
 * merge incoming new entities one by one.
 * @param {object} state Global state object
 * @param {object} action Redux action object
 * @returns {object} A new state after reducing the incoming action
 */
export default function entitiesReducer(state = INITIAL_STATE, action) {
  if (action.payload && action.payload.entities) {
    // merge provided by lodash will recursively merge objects.
    // Also see: http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html
    return merge({}, state, action.payload.entities);
  }
  return state;
}

