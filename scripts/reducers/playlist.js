import * as ActionTypes from '../constants/ActionTypes';
const PLAYLIST_INITIAL_STATE = {
  isFetching: false,
  songs: {},
  songIds: [],
  nextUrl: null,
};

const playlist = (state = PLAYLIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SONGS:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.RECEIVE_SONGS:
      return {
        ...state,
        isFetching: false,
        nextUrl: action.nextUrl,
        songIds: [...state.songIds, ...action.songIds],
        songs: {...state.songs, ...action.songs}
      };
    default:
      return state;
  }
};

/* Playlist Selectors */
// All states in func params are refered to as single playlist
export const getSongIds = state => state.songIds
export const getSongsObj = state => state.songs
export const getIsFetching = state => state.isFetching

export default playlist;
