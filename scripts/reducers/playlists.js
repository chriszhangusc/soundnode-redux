import * as ActionTypes from '../constants/ActionTypes';
import playlist from './playlist';

const INITIAL_STATE = {};

const playlists = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action),
      }
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action)
      }
    default:
      return state;
  }
}

export default playlists;
