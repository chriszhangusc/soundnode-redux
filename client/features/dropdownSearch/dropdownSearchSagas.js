import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import {
  receiveDropdownSearchTracks,
  receiveDropdownSearchUsers,
  showDropdownSearchResults,
  clearAndHideSearchResults,
  endDropdownSearch,
  failedToFetchSearchResults,
} from 'client/features/dropdownSearch/dropdownSearchActions';

import { DROPDOWN_SEARCH_REQUEST } from 'client/features/dropdownSearch/dropdownSearchConsts';

import { fetchDropdownSearchTracks, fetchDropdownSearchUsers } from './dropdownSearchApi';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

// Take in action
// Should add try catch
// Side effects in saga making actions cleaner. (Not mixing with thunks)
export function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;

  if (!keyword || keyword.trim() === '') {
    yield put(clearAndHideSearchResults());
    return;
  }
  const finalKeyword = keyword.trim();

  try {
    const [normalizedTracks, normalizedUsers] = yield [
      call(fetchDropdownSearchTracks, finalKeyword),
      call(fetchDropdownSearchUsers, finalKeyword),
    ];
    yield put(receiveDropdownSearchTracks(normalizedTracks));
    yield put(receiveDropdownSearchUsers(normalizedUsers));
    yield put(endDropdownSearch());
    yield put(showDropdownSearchResults());
  } catch (err) {
    yield put(failedToFetchSearchResults());
    console.log(err);
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDropdownSearch() {
  yield takeLatest(DROPDOWN_SEARCH_REQUEST, doDropdownSearch);
}
