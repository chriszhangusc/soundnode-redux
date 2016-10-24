import { put, call } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';
import { trackArraySchema, artistArraySchema } from 'client/schemas';
import { SAGA_DROPDOWN_SEARCH, SAGA_SEARCH } from 'client/constants/ActionTypes';
import {
  startDropdownSearch,
  endDropdownSearch,
  fetchAllSearchResults,
  fetchDropdownTracks,
  fetchDropdownArtists,
  dropdownTracksReceived,
  dropdownArtistsReceived,
  showSearchResults
} from 'client/redux/modules/search';
import { fetchAndNormalize } from 'client/utils/FetchUtils';
/* *****************************************************************************/
/* ****************************** SUBROUTINES **********************************/
/* *****************************************************************************/

// Take in action
// Should add try catch
function* doDropdownSearch({ payload }) {
  const { keyword, limit } = payload;
  yield put(startDropdownSearch());
  try {
    // fetchAndNormalize(endpoint, queryParams, normalizeSchema, fetchOptions)
    const trackEndPoint = '/sc/api-v1/tracks';
    const artistEndPoint = '/sc/api-v1/artists';
    const queryParams = {
      limit,
      q: keyword.trim().toLowerCase()
    };
    // Two async run in parallel.
    // When we yield an array of effects, the generator is blocked
    // until all the effects are resolved
    // or as soon as one is rejected (just like how Promise.all behaves).
    const [normalizedTracks, normalizedArtists] = yield [
      call(fetchAndNormalize, trackEndPoint, queryParams, trackArraySchema),
      call(fetchAndNormalize, artistEndPoint, queryParams, artistArraySchema)
    ];
    yield put(dropdownTracksReceived(normalizedTracks));
    yield put(dropdownArtistsReceived(normalizedArtists));
  } catch (err) {
    // Dispatch an action to trigger notification to print a error message.
    throw err;
  }
  yield put(endDropdownSearch());
  // yield call(fetchDropdownArtists, keyword, limit);
  yield put(showSearchResults());
  console.log('Drop down search');
}

function* doSearch({ payload }) {
  const { keyword, limit } = payload;
  console.log('do search saga: ', keyword, limit);
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
