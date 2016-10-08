import { fork, put, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from 'client/constants/ActionTypes';

import {
  changeVisiblePlaylist,
  requestSongs,
  receiveSongs
} from 'client/modules/playlists/actions';

import { fetchCharts } from 'client/services/SCAPIV2Services';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

// function* doFetchSongs(playlist, url) {
//
//   const response = yield call(axios.get, url);
//   const normalizedSongs = yield call(normalize, response.data.collection, arrayOfSongs);
//   yield put(actions.receiveSongs(
//       playlist,
//       normalizedSongs.entities.songs,
//       normalizedSongs.result,
//       response.data.next_href));
// }


// Initial loading
function* loadSongCardsPage({ payload }) {
  const playlistName = payload;
  // 1.Change visiblePlaylistName
  yield put(changeVisiblePlaylist(playlistName));
  // const playlistExists = yield select(selectors.playlistExists, playlistName);
  // Always load songs! Not working!
  yield put(requestSongs(playlistName));
  const normalizedTracks = yield call(fetchCharts, playlistName);
  yield put(
    receiveSongs(
      playlistName,
      normalizedTracks.entities,
      normalizedTracks.ids,
      normalizedTracks.next_href
     )
  );
}

// Scroll loading
function* loadMoreSongsOnScroll() {
  // const nextUrl = yield select(selectors.getVisibleNextUrl);
  // const playlistName = yield select(selectors.getVisiblePlaylistName);
  // const playlistExists = yield select(selectors.playlistExists, playlistName);
  // const isFetching = yield select(selectors.getVisibleFetchState);
  // if (playlistExists && !isFetching && nextUrl) {
  //   yield fork(doFetchSongs, playlistName, nextUrl);
  // }
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
