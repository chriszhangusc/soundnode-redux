import {DEFAULT_GENRE} from '../constants/SongConstants';
import * as types from '../constants/ActionTypes';

const PLAYLIST_INITIAL_STATE = {
  isFetching: false,
  songs: [],
  nextUrl: null,
};

const playlist = (state = PLAYLIST_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_SONGS:
      return {
        ...state,
        isFetching: true,
      };
    case types.RECEIVE_SONGS:
      return {
        ...state,
        isFetching: false,
        nextUrl: action.nextUrl,
        songs: [...state.songs, ...action.songs],
      };
    default:
      return state;
  }
};

const PLAYLISTS_INITIAL_STATE = {};

const playlists = (state = PLAYLISTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action),
      }
    case types.RECEIVE_SONGS:
      return {
        ...state,
        [action.genre]: playlist(state[action.genre], action)
      }
    default:
      return state;
  }
}

export default playlists;
