import axios from 'axios';
import * as types from '../constants/ActionTypes';

export const fetchSongsByGenre = (genre) => {
  const TEST_URL = `https://api.soundcloud.com/tracks?tags=${genre}&linked_partitioning=1&client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&offset=5&limit=50`;
  return (dispatch, getState) => {
    // Start fetching
    dispatch(requestSongs(genre));

    axios.get(TEST_URL).then((response) => {

      // We got something as response.data
      dispatch(receiveSongs(genre, response.data.collection));
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const requestSongs = (genre) => {
  return {
    type: types.REQUEST_SONGS,
    genre,
  };
};

export const receiveSongs = (genre, songs) => {
  return {
    type: types.RECEIVE_SONGS,
    genre,
    songs,
  };
};
