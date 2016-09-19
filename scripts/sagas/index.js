import { fork, take, put, call, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { generateFetchUrl } from '../utils/SongUtils';
import axios from 'axios';
import { normalize } from 'normalizr';
import { arrayOfSongs } from '../actions/schema';
import { requestSongs, receiveSongs } from '../actions/playlists';
import { changeVisiblePlaylist } from '../actions/visiblePlaylist';
import { getPlaylists, getVisiblePlaylistName, getNextUrlOfVisiblePlaylist } from '../reducers';

/******************************************************************************/
/******************************* Subroutines **********************************/
/******************************************************************************/

function* doFetchSongs(playlist, url) {
  yield put(requestSongs(playlist));
  const response = yield call(axios.get, url);
  const normalizedSongs = normalize(response.data.collection, arrayOfSongs);
  yield put(receiveSongs(
      playlist,
      normalizedSongs.entities.songs,
      normalizedSongs.result,
      response.data.next_href));
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLoadSongCardsPage() {
    while (true) {
    const { payload } = yield take(ActionTypes.LOAD_SONG_CARDS_PAGE);
    const playlist = payload;
    // 1.Change visiblePlaylistName
    yield put(changeVisiblePlaylist(playlist));
    const playlists = yield select(getPlaylists);
    // 2.Load songs if not cached
    const url = yield call(generateFetchUrl, playlist);
    if (!(playlist in playlists)) {
      doFetchSongs(playlist, url);
    }
  }
}

function* watchLoadMoreSongsOnScroll() {
  while (true) {
    yield take(ActionTypes.LOAD_MORE_SONGS_ON_SCROLL);
    const nextUrl = yield select(getNextUrlOfVisiblePlaylist);
    const playlist = yield select(getVisiblePlaylistName);
    const playlists = yield select(getPlaylists);
    if ((playlist in playlists) && (!playlists[playlist].isFetching)
     && (playlists[playlist].nextUrl !== null)) {
       doFetchSongs(playlist, nextUrl);
    }
  }
}

export default function* rootSaga() {
  yield [
    fork(watchLoadSongCardsPage),
    fork(watchLoadMoreSongsOnScroll)
  ]
}
