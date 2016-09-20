import * as ActionTypes from '../constants/ActionTypes';

export const requestSongs = (playlist) => ({
  type: ActionTypes.REQUEST_SONGS,
  payload: playlist
});

export const receiveSongs = (playlist, songs, songIds, nextUrl) => ({
  type: ActionTypes.RECEIVE_SONGS,
  payload: {
    playlist,
    songs,
    songIds,
    nextUrl
  }
});

// Saga Commands
export const changeSongAndPlay = (songId) => ({
  type: ActionTypes.CHANGE_SONG_AND_PLAY,
  payload: songId
});

export const loadSongCardsPage = (playlist) => ({
  type: ActionTypes.LOAD_SONG_CARDS_PAGE,
  payload: playlist
});

export const loadMoreSongsOnScroll = () => ({
  type: ActionTypes.LOAD_MORE_SONGS_ON_SCROLL
});

export const searchSongs = (searchText) => ({
  type: ActionTypes.SEARCH_SONGS,
  payload: searchText
});
