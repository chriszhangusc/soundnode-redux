import * as ActionTypes from '../constants/ActionTypes';

/* Reducers */
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
/* Playlist Selectors */
// All states in func params are refered to as single playlist
export const getSongIds = state => state.songIds
export const getSongsObj = state => state.songs
export const getIsFetching = state => state.isFetching
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
