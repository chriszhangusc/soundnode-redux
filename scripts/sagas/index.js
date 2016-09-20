import { fork } from 'redux-saga/effects';
import * as fromPlayer from './player';
import * as fromPlaylists from './playlists';

function* rootSaga() {
  yield [
    fork(fromPlaylists.watchLoadSongCardsPage),
    fork(fromPlaylists.watchLoadMoreSongsOnScroll),
    fork(fromPlaylists.watchChangeSongAndPlay),
    fork(fromPlayer.watchRegularTimeUpdate),
    fork(fromPlayer.watchSeekTimeUpdate),
    fork(fromPlayer.watchEndSeekTime),
    fork(fromPlayer.watchEndSeekVolume),
    fork(fromPlayer.watchToggleMute)
  ]
}

export default rootSaga;
