import { fork, all } from 'redux-saga/effects';
import * as fromDropdownSearch from 'features/dropdownSearch/dropdownSearchSagas';

function* rootSaga() {
  yield all([
    fork(fromDropdownSearch.watchDropdownSearch),
  ]);
}

export default rootSaga;
