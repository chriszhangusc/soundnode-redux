import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SAGA_DROPDOWN_SEARCH, SAGA_SEARCH } from 'client/constants/ActionTypes';
import {
  fetchAllSearchResults,
  fetchDropdownTracks,
  fetchDropdownArtists,
  showSearchResults
} from 'client/redux/modules/search';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/
// Take in action
// Should add try catch
function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(fetchDropdownTracks(keyword, limit));
  yield put(fetchDropdownArtists(keyword, limit));
  // yield put(endSearch());
  yield put(showSearchResults());
  console.log('Drop down search');
}

function* doSearch({ payload }) {
  const { keyword, limit } = payload;
  console.log('do search saga: ', keyword, limit);
  yield put(fetchAllSearchResults(keyword, limit));
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDoDropdownSearch() {
  yield takeLatest(SAGA_DROPDOWN_SEARCH, doDropdownSearch);
}

export function* watchDoSearch() {
  yield takeLatest(SAGA_SEARCH, doSearch);
}
