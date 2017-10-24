// import * as types from 'features/entities/users/usersActionTypes';
import merge from 'lodash/merge';

export default function commentsReducer(state = {}, action) {
  switch (action.type) {
    default:
      if (action.payload && action.payload.entities && action.payload.entities.comments) {
        return merge({}, state, action.payload.entities.comments);
      }
      return state;
  }
}
