import { fork } from 'redux-saga/effects';
import * as fromPlayer from './playerSagas';
import * as fromSearch from './searchSagas';

function* rootSaga() {
  yield [
    fork(fromPlayer.watchChangeSongAndPlay),
    fork(fromPlayer.watchRegularTimeUpdate),
    fork(fromPlayer.watchSeekTimeUpdate),
    fork(fromPlayer.watchEndSeekTime),
    fork(fromPlayer.watchEndSeekVolume),
    fork(fromPlayer.watchToggleMute),
    fork(fromPlayer.watchPlayNextSong),
    fork(fromPlayer.watchPlayPrevSong),
    fork(fromPlayer.watchChangePlayMode),
    fork(fromSearch.watchDoSearch)
  ];
}

export default rootSaga;
