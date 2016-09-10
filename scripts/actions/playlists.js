import axios from 'axios';
import * as ActionTypes from '../constants/ActionTypes';
import {generateFetchUrl} from '../utils/SongUtils';
import {loadPlaylist} from '../actions/player';

/* Pure Action Creators */
export const requestSongs = (genre) => ({
  type: ActionTypes.REQUEST_SONGS,
  genre
})

export const receiveSongs = (genre, songs, nextUrl) => ({
  type: ActionTypes.RECEIVE_SONGS,
  genre,
  songs,
  nextUrl
})

/* Thunk Action Creators */

// Responsible for initial fetching of a genre
export const fetchSongsOnLoad = (genre, playlists) => {
  return (dispatch, getState) => {
    // Initial fetch genre not cached yet so our playlists cache will not have property genre
    if (shouldFetchSongs(genre, playlists)) {

      const url = generateFetchUrl(genre);
      // console.log(url);
      // Start fetching
      dispatch(requestSongs(genre));
      axios.get(url).then((response) => {
        // We got something as response.data
        dispatch(receiveSongs(genre, response.data.collection, response.data.next_href));
      }).catch((error) => {
        console.log(error);
      });
    }
  };
};

// Responsible for fetching songs on scrolling page to the bottom
export const fetchSongsOnScroll = (genre, playlists) => {
  return (dispatch, getState) => {

    if (genre in playlists && !playlists[genre].isFetching && playlists[genre].nextUrl !== null) {
      const url = playlists[genre].nextUrl;

      dispatch(requestSongs(genre));
      axios.get(url).then((response) => {
        // We got something as response.data
        dispatch(receiveSongs(genre, response.data.collection, response.data.next_href));
      }).catch((error) => {
        console.log(error);
      });
    }
  };
}

// Come back at you later bitch
// const fetchSongsByGenre = (genre) => {
//     const url = generateFetchUrl(genre);
//     // Start fetching
//     dispatch(requestSongs(genre));
//     axios.get(url).then((response) => {
//       // We got something as response.data
//       dispatch(receiveSongs(genre, response.data.collection));
//     }).catch((error) => {
//       console.log(error);
//     });
// };

const shouldFetchSongs = (genre, playlists) => {
  // 1. If there is no songs of this genre cached in store, go ahead and fetch data.
  // 2. Fetch if current genre is not fetching and nextUrl is valid
  return !(genre in playlists);
};
