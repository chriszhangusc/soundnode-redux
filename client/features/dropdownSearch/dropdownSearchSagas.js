import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fetchTracks, fetchUsers } from 'client/api/sc/v1';

import {
  dropdownTracksReceived,
  dropdownArtistsReceived,
  showDropdownSearchResults,
  clearAndHideSearchResults,
} from 'client/features/dropdownSearch/dropdownSearchActions';

import { DROPDOWN_SEARCH_REQUEST } from 'client/features/dropdownSearch/dropdownSearchConsts';

/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

// Take in action
// Should add try catch
// Side effects in saga making actions cleaner. (Not mixing with thunks)
function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;

  if (!keyword || keyword.trim() === '') {
    yield put(clearAndHideSearchResults());
    return;
  }

  const [normalizedTracks, normalizedArtists] = yield [
    call(fetchTracks, { q: keyword.trim().toLowerCase() }, limit),
    call(fetchUsers, { q: keyword.trim().toLowerCase() }, limit),
  ];

  yield put(dropdownTracksReceived(normalizedTracks));
  yield put(dropdownArtistsReceived(normalizedArtists));
  yield put(showDropdownSearchResults());
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDropdownSearch() {
  yield takeLatest(DROPDOWN_SEARCH_REQUEST, doDropdownSearch);
}
