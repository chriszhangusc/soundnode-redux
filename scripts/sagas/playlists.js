import axios from 'axios';
import { normalize } from 'normalizr';
import { fork, put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { generateTopGenreFetchUrl } from '../utils/SongUtils';
import { arrayOfSongs } from '../actions/schema';
import actions from '../actions';
import * as selectors from '../reducers';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

function* doFetchSongs(playlist, url) {
  yield put(actions.requestSongs(playlist));
  const response = yield call(axios.get, url);
  const normalizedSongs = yield call(normalize, response.data.collection, arrayOfSongs);
  yield put(actions.receiveSongs(
      playlist,
      normalizedSongs.entities.songs,
      normalizedSongs.result,
      response.data.next_href));
}


// Initial loading and Nav bar searching
function* loadSongCardsPage({ payload }) {
  const playlistName = payload;
  // 1.Change visiblePlaylistName
  yield put(actions.changeVisiblePlaylist(playlistName));
  const playlistExists = yield select(selectors.playlistExists, playlistName);
  // 2.Load songs if not cached
  const url = yield call(generateTopGenreFetchUrl, playlistName);
  console.log(url);
  if (!playlistExists) yield fork(doFetchSongs, playlistName, url);
}

// Scroll loading
function* loadMoreSongsOnScroll() {
  const nextUrl = yield select(selectors.getVisibleNextUrl);
  const playlistName = yield select(selectors.getVisiblePlaylistName);
  const playlistExists = yield select(selectors.playlistExists, playlistName);
  const isFetching = yield select(selectors.getVisibleFetchState);
  if (playlistExists && !isFetching && nextUrl) {
    yield fork(doFetchSongs, playlistName, nextUrl);
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchLoadSongCardsPage() {
  yield takeEvery(ActionTypes.SAGA_LOAD_SONG_CARDS_PAGE, loadSongCardsPage);
}
export function* watchLoadMoreSongsOnScroll() {
  yield takeEvery(ActionTypes.SAGA_LOAD_MORE_SONGS_ON_SCROLL, loadMoreSongsOnScroll);
}

export function* watchSearchSongs() {
  yield takeEvery(ActionTypes.SEARCH_SONGS, loadSongCardsPage);
}
