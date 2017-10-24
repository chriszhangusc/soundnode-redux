import * as types from 'features/entities/tracks/tracksActionTypes';
import merge from 'lodash/merge';

export default function tracksReducer(state = {}, action) {
  switch (action.type) {
    default:
      if (action.payload && action.payload.entities && action.payload.entities.tracks) {
        return merge({}, state, action.payload.entities.tracks);
      }
      return state;
  }
}
