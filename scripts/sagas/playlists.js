import { fork, put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../constants/ActionTypes';
import { generateFetchUrl } from '../utils/SongUtils';
import axios from 'axios';
import { normalize } from 'normalizr';
import { arrayOfSongs } from '../actions/schema';
import actions from '../actions';
import * as selectors from '../reducers';

/******************************************************************************/
/******************************* SUBROUTINES **********************************/
/******************************************************************************/

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

// Initial loading
function* loadSongCardsPage({ payload }) {
  const playlist = payload;
  // 1.Change visiblePlaylistName
  yield put(actions.changeVisiblePlaylist(playlist));
  const playlists = yield select(selectors.getPlaylists);
  // 2.Load songs if not cached
  const url = yield call(generateFetchUrl, playlist);
  if (!(playlist in playlists)) {
    yield fork(doFetchSongs, playlist, url);
  }
}

// Scroll loading
function* loadMoreSongsOnScroll() {
    const nextUrl = yield select(selectors.getNextUrlOfVisiblePlaylist);
    const playlist = yield select(selectors.getVisiblePlaylistName);
    const playlists = yield select(selectors.getPlaylists);
    if ((playlist in playlists) && (!playlists[playlist].isFetching)
     && (playlists[playlist].nextUrl !== null)) {
       yield fork(doFetchSongs, playlist, nextUrl);
    }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchLoadSongCardsPage() {
  yield takeEvery(ActionTypes.LOAD_SONG_CARDS_PAGE, loadSongCardsPage);
}
export function* watchLoadMoreSongsOnScroll() {
  yield takeEvery(ActionTypes.LOAD_MORE_SONGS_ON_SCROLL, loadMoreSongsOnScroll);
}
