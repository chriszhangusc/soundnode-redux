import { fork, all } from 'redux-saga/effects';
import * as fromSearchSuggestion from '@soundnode-redux/client/src/features/searchSuggestion/searchSuggestionSagas';

function* rootSaga() {
  yield all([fork(fromSearchSuggestion.watchSearchSuggestion)]);
}

export default rootSaga;
