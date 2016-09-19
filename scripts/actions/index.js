/******************************************************************************/
/***************************** SAGA ACTIONS ***********************************/
/******************************************************************************/
import * as ActionTypes from '../constants/ActionTypes';
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

export const changeSongAndPlay = (songId) => {
  return {
    type: ActionTypes.CHANGE_SONG_AND_PLAY,
    payload: songId
  };
}
