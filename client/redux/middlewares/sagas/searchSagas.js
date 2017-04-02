import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fetchTracks, fetchArtists } from 'client/api/sc/v1';
import {
  SAGA_DROPDOWN_SEARCH,
  SAGA_SEARCH,
  startDropdownSearch,
  endDropdownSearch,
  fetchAllSearchResults,
  dropdownTracksReceived,
  dropdownArtistsReceived,
  showDropdownSearchResults,
  clearSearchPageResults,
} from 'client/redux/modules/search';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

// Take in action
// Should add try catch
// Side effects in saga making actions cleaner. (Not mixing with thunks)
function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(startDropdownSearch());
  const [normalizedTracks, normalizedArtists] = yield [
    call(fetchTracks, { q: keyword.trim().toLowerCase() }, limit),
    call(fetchArtists, { q: keyword.trim().toLowerCase() }, limit),
  ];
  yield put(dropdownTracksReceived(normalizedTracks));
  yield put(dropdownArtistsReceived(normalizedArtists));

  yield put(endDropdownSearch());
  yield put(showDropdownSearchResults());
}

function* doSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(clearSearchPageResults());
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
