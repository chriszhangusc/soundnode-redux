import * as ActionTypes from '../constants/ActionTypes';

export const requestSongs = (playlist) => ({
  type: ActionTypes.REQUEST_SONGS,
  playlist
});

export const receiveSongs = (playlist, songs, songIds, nextUrl) => ({
  type: ActionTypes.RECEIVE_SONGS,
  playlist,
  songs,
  songIds,
  nextUrl
});
