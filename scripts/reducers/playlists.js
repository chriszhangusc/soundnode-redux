import * as ActionTypes from '../constants/ActionTypes';
import playlist from './playlist';
import { createSelector } from 'reselect';

const PLAYLISTS_INITIAL_STATE = {};

const playlists = (state = PLAYLISTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLIST:
      return {
        ...state,
        [action.playlist]: playlist(state[action.playlist], action),
      }
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        [action.playlist]: playlist(state[action.playlist], action),
      }
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        [action.playlist]: playlist(state[action.playlist], action),
      }
    default:
      return state;
  }
}

export default playlists;
