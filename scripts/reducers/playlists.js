import { fromJS } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';
import * as fromPlaylist from './playlist';

const playlist = fromPlaylist.default;

const PLAYLISTS_INITIAL_STATE = fromJS({
  visiblePlaylist: null,
  playerPlaylist: null
});

const playlists = (state = PLAYLISTS_INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.LOAD_PLAYER_PLAYLIST:
      return state.set('playerPlaylist', action.payload);

    case ActionTypes.CHANGE_VISIBLE_PLAYLIST:
      return state.set('visiblePlaylist', action.payload);

    case ActionTypes.REQUEST_SONGS:
      return state.set(action.payload, playlist(state.get(action.payload), action));

    case ActionTypes.RECEIVE_SONGS:
      return state.set(
        action.payload.playlist,
        playlist(state.get(action.payload.playlist), action)
      );

    default:
      return state;
  }
};

export const getVisiblePlaylistName = state => state.get('visiblePlaylist');

export const getPlayerPlaylistName = state => state.get('playerPlaylist');

// Return the player playlist object itself.
export const getPlayerPlaylist = (state) => {
  const playlistName = getPlayerPlaylistName(state);
  // Weired rule: eslint no-prototype-builtins: "error"
  // Difference between a in obj and hasOwnProperty,
  // the second way won`t look down the prototype chain
  return state.has(playlistName) ? state.get(playlistName) : undefined;
};

// Return the visible playlist object itself.
export const getVisiblePlaylist = (state) => {
  const visiblePlaylistName = getVisiblePlaylistName(state);
  return state.has(visiblePlaylistName) ? state.get(visiblePlaylistName) : undefined;
};

export const getVisibleFetchState = (state) => {
  const visiblePlaylist = getVisiblePlaylist(state);
  return visiblePlaylist ? fromPlaylist.getFetchState(visiblePlaylist) : undefined;
};

export const getPlayerSongMap = (state) => {
  const playerPlaylist = getPlayerPlaylist(state);
  return playerPlaylist ? fromPlaylist.getSongs(playerPlaylist) : undefined;
};

export const getPlayerSongIds = (state) => {
  const playerPlaylist = getPlayerPlaylist(state);
  return playerPlaylist ? fromPlaylist.getSongIds(playerPlaylist) : undefined;
};

export const getVisibleSongMap = (state) => {
  const visiblePlaylist = getVisiblePlaylist(state);
  return visiblePlaylist ? fromPlaylist.getSongs(visiblePlaylist) : undefined;
};

export const getVisibleSongIds = (state) => {
  const visiblePlaylist = getVisiblePlaylist(state);
  return visiblePlaylist ? fromPlaylist.getSongIds(visiblePlaylist) : undefined;
};

export const getVisibleNextUrl = (state) => {
  const visiblePlaylist = getVisiblePlaylist(state);
  return visiblePlaylist ? fromPlaylist.getNextUrl(visiblePlaylist) : undefined;
};

export const playlistExists = (state, playlistName) => state.has(playlistName);

export default playlists;
