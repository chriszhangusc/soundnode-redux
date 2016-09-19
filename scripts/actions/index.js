/******************************************************************************/
/***************************** SAGA ACTIONS ***********************************/
/******************************************************************************/

export const loadSongCardsPage = (playlist) => {
  return {
    type: 'LOAD_SONG_CARDS_PAGE',
    payload: playlist
  };
};

export const loadMoreSongsOnScroll = () => {
  return {
    type: 'LOAD_MORE_SONGS_ON_SCROLL'
  };
};
