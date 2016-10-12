import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SAGA_DROPDOWN_SEARCH, SAGA_SEARCH } from 'client/constants/ActionTypes';
import {
  startSearch,
  endSearch,
  searchResultsReceived,
  artistsReceived,
  tracksReceived,
  showSearchResults
} from 'client/modules/search/actions';
import { fetchUsers, fetchTracks } from 'client/services/SCAPIServices';
import { normalizeArtists, normalizeTracks } from 'client/utils/NormalizeUtils';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/
// Take in action
// Should add try catch
function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(startSearch());
  const [artistRes, trackRes] = yield [
    call(fetchUsers, keyword, limit),
    call(fetchTracks, keyword, limit)
  ];
  const normalizedArtists = yield call(normalizeArtists, artistRes.data);
  const normalizedTracks = yield call(normalizeTracks, trackRes.data);
  yield put(artistsReceived(normalizedArtists));
  yield put(tracksReceived(normalizedTracks));
  yield put(endSearch());
  yield put(showSearchResults());
}

function* doSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(startSearch());
  const trackRes = yield call(fetchTracks, keyword, limit);
  const normalizedTracks = yield call(normalizeTracks, trackRes.data);
  yield put(searchResultsReceived(normalizedTracks));
  yield put(endSearch());
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
