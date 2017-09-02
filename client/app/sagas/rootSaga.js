import { fork, all } from 'redux-saga/effects';
import * as fromSearchSuggestion from 'features/searchSuggestion/searchSuggestionSagas';

function* rootSaga() {
  yield all([fork(fromSearchSuggestion.watchSearchSuggestion)]);
}

export default rootSaga;
