import * as types from 'features/entities/users/usersActionTypes';
import merge from 'lodash/merge';

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    default:
      if (action.payload && action.payload.entities && action.payload.entities.users) {
        return merge({}, state, action.payload.entities.users);
      }
      return state;
  }
}
