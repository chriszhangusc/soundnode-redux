import axios from 'axios';
import * as types from '../constants/ActionTypes';
import {generateFetchUrl} from '../api/SongAPIs';

export const fetchSongsIfNeeded = (genre, playlists) => {
  return (dispatch, getState) => {
    // Initial fetch genre not cached yet so our playlists cache will not have property genre
    if (shouldFetchSongs(genre, playlists)) {
      let url = '';
      if (genre in playlists && playlists[genre].nextUrl === null) {
        url = playlists[genre].nextUrl
      } else {
        url = generateFetchUrl(genre);
      }

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

export const requestSongs = (genre) => {
  return {
    type: types.REQUEST_SONGS,
    genre,
  };
};

export const receiveSongs = (genre, songs, nextUrl) => {
  return {
    type: types.RECEIVE_SONGS,
    genre,
    songs,
    nextUrl,
  };
};
