import * as ActionTypes from '../constants/ActionTypes';

export const requestSongs = playlist => ({
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

export const changeVisiblePlaylist = visiblePlaylistName => ({
  type: ActionTypes.CHANGE_VISIBLE_PLAYLIST,
  payload: visiblePlaylistName
});

// Saga Actions
// Import from player
export const sagaChangeSongAndPlay = songId => ({
  type: ActionTypes.SAGA_CHANGE_SONG_AND_PLAY,
  payload: songId
});

export const sagaLoadSongCardsPage = playlist => ({
  type: ActionTypes.SAGA_LOAD_SONG_CARDS_PAGE,
  payload: playlist
});

export const sagaLoadMoreSongsOnScroll = () => ({
  type: ActionTypes.SAGA_LOAD_MORE_SONGS_ON_SCROLL
});

export const searchSongs = searchText => ({
  type: ActionTypes.SEARCH_SONGS,
  payload: searchText
});
