import * as ActionTypes from '../constants/ActionTypes';
const PLAYLIST_INITIAL_STATE = {
  isFetching: false,
  songs: {},
  songIds: [],
  nextUrl: null,
};

const playlist = (state = PLAYLIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_PLAYLIST:
      return {
        ...state,
      }
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

export const getFetchState = state => state.isFetching
export const getSongs = state => state.songs
export const getSongIds = state => state.songIds
export const getNextUrl = state => state.nextUrl

export default playlist;
