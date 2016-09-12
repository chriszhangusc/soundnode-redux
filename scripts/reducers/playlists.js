import * as ActionTypes from '../constants/ActionTypes';
import playlist, { getSongsObj, getSongIds, getIsFetching } from './playlist';
/* Reducers */

const PLAYLISTS_INITIAL_STATE = {};

const playlists = (state = PLAYLISTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action),
      }
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action),
      }
    default:
      return state;
  }
}

/* Playlists Selectors */
// All states in func params are refered to as playlists
export const getSongByIdAndPlaylist = (state, songId, playlist) => {
  return getSongsObj(state[playlist])[songId];
}
export const getSongsAsArray = (state, genre) => {
  const playlist = state[genre];
  const songIds = getSongIds(playlist);
  const songsObj = getSongsObj(playlist);
  return songIds.map(id => songsObj[id]);
};

export const getFetchState = (state, genre) => {
  const playlist = state[genre];
  return getIsFetching(playlist);
}

export default playlists;
