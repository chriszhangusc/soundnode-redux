import axios from 'axios';
import * as ActionTypes from '../constants/ActionTypes';
import {generateFetchUrl} from '../utils/SongUtils';
import { normalize } from 'normalizr';
import { arrayOfSongs } from './schema';
import { changeVisiblePlaylist } from './visiblePlaylist';
import { getNextUrlOfVisiblePlaylist, getVisiblePlaylistName } from '../reducers';
/* Pure Action Creators */
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
/* Thunk Action Creators */

const shouldFetchSongsOnLoad = (genre, playlists) => {
  // 1. If there is no songs of this genre cached in store, go ahead and fetch data.
  // 2. Fetch if current genre is not fetching and nextUrl is valid
  return !(genre in playlists);
};


// Responsible for initial fetching of a genre
export const fetchSongsOnLoad = (playlist, playlists) => {
  return (dispatch) => {
    dispatch(changeVisiblePlaylist(playlist));
    // Initial fetch genre not cached yet so our playlists cache will not have property genre
    if (shouldFetchSongsOnLoad(playlist, playlists)) {
      const url = generateFetchUrl(playlist);
      fetchAndReceiveSongs(url, playlist, dispatch);
    }
  };
};

const shouldFetchSongsOnScroll = (playlist, playlists) => {
  return (playlist in playlists)
          && (!playlists[playlist].isFetching)
          && (playlists[playlist].nextUrl !== null);
}

// Responsible for fetching songs on scrolling page to the bottom
export const fetchSongsOnScroll = () => {
  return (dispatch, getState) => {
    const state = getState();
    const nextUrl = getNextUrlOfVisiblePlaylist(state);
    const visiblePlaylistName = getVisiblePlaylistName(state);
    if (shouldFetchSongsOnScroll(visiblePlaylistName, state.playlists)) {
      fetchAndReceiveSongs(nextUrl, visiblePlaylistName, dispatch);
    }
  };
}

const fetchAndReceiveSongs = (url, playlist, dispatch) => {
  dispatch(requestSongs(playlist));
  axios.get(url).then((response) => {
    // We got something as response.data
    const normalizedSongs = normalize(response.data.collection, arrayOfSongs);
    // console.log(normalizedSongs.entities.songs); songs lookup table
    // console.log(normalizedSongs.result);
    dispatch(
      receiveSongs(playlist,
        normalizedSongs.entities.songs,
        normalizedSongs.result,
        response.data.next_href)
    );
  });
};
