import {fork} from 'redux-saga/effects';
// import * as fromPlayer from './playerSagas';
import * as fromSearch from './searchSagas';

function * rootSaga() {
    yield[fork(fromSearch.watchDoSearch),
        fork(fromSearch.watchDoDropdownSearch)];
}

export default rootSaga;
