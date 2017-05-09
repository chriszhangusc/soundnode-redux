import { fork } from 'redux-saga/effects';
import * as fromDropdownSearch from 'client/features/dropdownSearch/dropdownSearchSagas';

function* rootSaga() {
  yield [
    fork(fromDropdownSearch.watchDropdownSearch),
  ];
}

export default rootSaga;
