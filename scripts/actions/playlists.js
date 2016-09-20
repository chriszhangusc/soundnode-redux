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

// Saga Commands
export const changeSongAndPlay = (songId) => {
  return {
    type: ActionTypes.CHANGE_SONG_AND_PLAY,
    payload: songId
  };
}

export const loadSongCardsPage = (playlist) => {
  return {
    type: ActionTypes.LOAD_SONG_CARDS_PAGE,
    payload: playlist
  };
};

export const loadMoreSongsOnScroll = () => {
  return {
    type: ActionTypes.LOAD_MORE_SONGS_ON_SCROLL
  };
};
