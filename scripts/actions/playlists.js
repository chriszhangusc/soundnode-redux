import axios from 'axios';
import * as ActionTypes from '../constants/ActionTypes';
import {generateFetchUrl} from '../utils/SongUtils';
import {loadPlaylist} from '../actions/player';
import { normalize } from 'normalizr';
import { arrayOfSongs } from './schema';
/* Pure Action Creators */
export const requestSongs = (genre) => ({
  type: ActionTypes.REQUEST_SONGS,
  genre
})

export const receiveSongs = (genre, songs, songIds, nextUrl) => ({
  type: ActionTypes.RECEIVE_SONGS,
  genre,
  songs,
  songIds,
  nextUrl
})

/* Thunk Action Creators */

const shouldFetchSongsOnLoad = (genre, playlists) => {
  // 1. If there is no songs of this genre cached in store, go ahead and fetch data.
  // 2. Fetch if current genre is not fetching and nextUrl is valid
  return !(genre in playlists);
};


// Responsible for initial fetching of a genre
export const fetchSongsOnLoad = (genre, playlists) => {
  return (dispatch, getState) => {
    // Initial fetch genre not cached yet so our playlists cache will not have property genre
    if (shouldFetchSongsOnLoad(genre, playlists)) {
      const url = generateFetchUrl(genre);
      fetchAndReceiveSongs(url, genre, dispatch);
    }
  };
};

const shouldFetchSongsOnScroll = (genre, playlists) => {
  return genre in playlists && !playlists[genre].isFetching && playlists[genre].nextUrl !== null;
}

// Responsible for fetching songs on scrolling page to the bottom
export const fetchSongsOnScroll = (genre, playlists) => {
  return (dispatch, getState) => {

    if (shouldFetchSongsOnScroll(genre, playlists)) {
      const url = playlists[genre].nextUrl;
      fetchAndReceiveSongs(url, genre, dispatch);
    }
  };
}

const fetchAndReceiveSongs = (url, genre, dispatch) => {
  dispatch(requestSongs(genre));
  axios.get(url).then((response) => {
    // We got something as response.data
    const normalizedSongs = normalize(response.data.collection, arrayOfSongs);
    // console.log(normalizedSongs.entities.songs); songs lookup table
    // console.log(normalizedSongs.result);
    dispatch(receiveSongs(genre, normalizedSongs.entities.songs, normalizedSongs.result, response.data.next_href));

  });
};
