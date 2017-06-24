import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import {
  updateTrackResults,
  updateUserResults,
  showDropdownSearchResults,
  clearAndHideSearchResults,
  stopDropdownSearch,
  failedToFetchSearchResults,
} from 'client/features/dropdownSearch/dropdownSearchActions';
import { mergeEntities } from 'client/features/entities/entitiesActions';
import { DROPDOWN_SEARCH_START } from 'client/features/dropdownSearch/dropdownSearchConsts';

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
    yield put(mergeEntities(normalizedTracks.entities));
    yield put(mergeEntities(normalizedUsers.entities));
    yield put(updateTrackResults(normalizedTracks.result));
    yield put(updateUserResults(normalizedUsers.result));
    yield put(showDropdownSearchResults());
  } catch (err) {
    console.error(err);
    yield put(failedToFetchSearchResults());
  } finally {
    yield put(stopDropdownSearch());
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDropdownSearch() {
  yield takeLatest(DROPDOWN_SEARCH_START, doDropdownSearch);
}
