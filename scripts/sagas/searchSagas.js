import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SAGA_SEARCH } from 'client/constants/ActionTypes';
import {
  startSearch,
  endSearch,
  usersReceived,
  tracksReceived,
  showSearchResults
} from 'client/modules/search/actions';
import { fetchUsers, fetchTracks } from 'client/services/SCAPIServices';
import { normalizeSearchResults } from 'client/utils/NormalizeUtils';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/
// Take in action
// Should add try catch
function* doSearch({ payload }) {
  const keyword = payload;
  yield put(startSearch());
  const [userRes, trackRes] = yield [
    call(fetchUsers, keyword),
    call(fetchTracks, keyword)
  ];
  const normalizedUsers = yield call(normalizeSearchResults, userRes.data);
  const normalizedTracks = yield call(normalizeSearchResults, trackRes.data);
  yield put(usersReceived(normalizedUsers));
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
