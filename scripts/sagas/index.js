import { fork } from 'redux-saga/effects';
import * as fromPlayer from './player';
import * as fromPlaylists from './playlists';

function* rootSaga() {
  yield [
    fork(fromPlaylists.watchSearchSongs),
    fork(fromPlaylists.watchLoadSongCardsPage),
    fork(fromPlaylists.watchLoadMoreSongsOnScroll),
    fork(fromPlayer.watchChangeSongAndPlay),
    fork(fromPlayer.watchRegularTimeUpdate),
    fork(fromPlayer.watchSeekTimeUpdate),
    fork(fromPlayer.watchEndSeekTime),
    fork(fromPlayer.watchEndSeekVolume),
    fork(fromPlayer.watchToggleMute),
    fork(fromPlayer.watchPlayNextSong),
    fork(fromPlayer.watchPlayPrevSong),
    fork(fromPlayer.watchChangePlayMode)
  ];
}

export default rootSaga;
