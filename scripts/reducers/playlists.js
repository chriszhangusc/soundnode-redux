import * as ActionTypes from '../constants/ActionTypes';
import playlist from './playlist';

const PLAYLISTS_INITIAL_STATE = {};

const playlists = (state = PLAYLISTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLIST:
      return {
        ...state,
        [action.playlist]: playlist(state[action.playlist], action)
      }
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        [action.payload]: playlist(state[action.payload], action)
      }
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        [action.payload.playlist]: playlist(state[action.payload.playlist], action)
      }
    default:
      return state;
  }
}

export const getPlaylist = (state, playlistName) => {
  if (playlistName) return state[playlistName];
  return null;
}
export default playlists;
