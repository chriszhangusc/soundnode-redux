import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { fetchTracks, fetchUsers } from 'client/common/api/sc/v1';
import pick from 'lodash/pick';

import {
  dropdownTracksReceived,
  dropdownArtistsReceived,
  showDropdownSearchResults,
  clearAndHideSearchResults,
} from 'client/features/dropdownSearch/dropdownSearchActions';

import { DROPDOWN_SEARCH_REQUEST } from 'client/features/dropdownSearch/dropdownSearchConsts';

import { fetchDropdownSearchTracks, fetchDropdownSearchUsers } from './dropdownSearchApi';
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
  const finalKeyword = keyword.trim();
  // yield call(doDropdownTrackSearch, finalKeyword);

  // How about error handling??
  const [normalizedTracks, normalizedArtists] = yield [
    call(fetchDropdownSearchTracks, finalKeyword),
    call(fetchDropdownSearchUsers, finalKeyword),
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
