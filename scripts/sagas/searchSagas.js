import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SAGA_SEARCH } from 'client/constants/ActionTypes';
import {
  startSearch,
  endSearch,
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
function* doSearch({ payload }) {
  const keyword = payload;
  yield put(startSearch());
  const [artistRes, trackRes] = yield [
    call(fetchUsers, keyword),
    call(fetchTracks, keyword)
  ];
  const normalizedArtists = yield call(normalizeArtists, artistRes.data);
  const normalizedTracks = yield call(normalizeTracks, trackRes.data);
  yield put(artistsReceived(normalizedArtists));
  yield put(tracksReceived(normalizedTracks));
  yield put(endSearch());
  yield put(showSearchResults());
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDoSearch() {
  yield takeLatest(SAGA_SEARCH, doSearch);
}
