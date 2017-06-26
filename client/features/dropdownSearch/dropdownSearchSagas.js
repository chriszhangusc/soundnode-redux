import { put, call, takeLatest, all } from 'redux-saga/effects';

import * as actions from 'features/dropdownSearch/dropdownSearchActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { DROPDOWN_SEARCH_START } from 'features/dropdownSearch/dropdownSearchConsts';

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
    yield put(actions.clearAndHideSearchResults());
    return;
  }
  const finalKeyword = keyword.trim();
  yield put(actions.updateDropdownSearchQuery(finalKeyword));
  try {
    const [normalizedTracks, normalizedUsers] = yield all([
      call(fetchDropdownSearchTracks, finalKeyword),
      call(fetchDropdownSearchUsers, finalKeyword),
    ]);
    yield put(mergeEntities(normalizedTracks.entities));
    yield put(mergeEntities(normalizedUsers.entities));
    yield put(actions.updateTrackResults(normalizedTracks.result));
    yield put(actions.updateUserResults(normalizedUsers.result));
    yield put(actions.showDropdownSearchResults());
  } catch (err) {
    console.error(err);
    yield put(actions.failedToFetchSearchResults());
  } finally {
    yield put(actions.stopDropdownSearch());
  }
}

/* *****************************************************************************/
/* ****************************** WATCHERS *************************************/
/* *****************************************************************************/

export function* watchDropdownSearch() {
  yield takeLatest(DROPDOWN_SEARCH_START, doDropdownSearch);
}
