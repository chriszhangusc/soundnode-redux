import { put, call, takeLatest, all } from 'redux-saga/effects';
import { normalizeTracks, normalizeUsers } from 'common/utils/normalizeUtils';
import * as actions from 'features/searchSuggestion/searchSuggestionActions';
import { mergeEntities } from 'features/entities/entitiesActions';
import { defaultWarning } from 'features/notification/notificationActions';
import { SEARCH_SUGGESTION_START } from 'features/searchSuggestion/searchSuggestionActionTypes';
import { searchTracks } from 'common/api/trackApi';
import { searchUsers } from 'common/api/userApi';

/* **************************************************************************** */
/* ****************************** SUBROUTINES ********************************* */
/* **************************************************************************** */

// Take in action
// Should add try catch
// Side effects in saga making actions cleaner. (Not mixing with thunks)
export function* doSearchSuggestion({ payload }) {
  const { keyword, limit } = payload;
  if (!keyword || keyword.trim() === '') {
    yield put(actions.clearAndHideSearchResults());
    return;
  }
  const finalKeyword = keyword.trim();
  yield put(actions.updateSearchSuggestionQuery(finalKeyword));
  try {
    const [tracksResponse, usersResponse] = yield all([
      call(searchTracks, finalKeyword, limit),
      call(searchUsers, finalKeyword, limit),
    ]);

    const normalizedTracks = normalizeTracks(tracksResponse);
    const normalizedUsers = normalizeUsers(usersResponse);

    yield put(mergeEntities(normalizedTracks.entities));
    yield put(mergeEntities(normalizedUsers.entities));
    yield put(actions.updateTrackResults(normalizedTracks.result));
    yield put(actions.updateUserResults(normalizedUsers.result));
    yield put(actions.showSearchSuggestionResults());
  } catch (err) {
    console.error(err);
    yield put(actions.failedToFetchSearchResults());
    yield put(defaultWarning());
  } finally {
    yield put(actions.stopSearchSuggestion());
  }
}

/** *************************************************************************** */
/** ***************************** WATCHERS ************************************ */
/** *************************************************************************** */

export function* watchSearchSuggestion() {
  yield takeLatest(SEARCH_SUGGESTION_START, doSearchSuggestion);
}
