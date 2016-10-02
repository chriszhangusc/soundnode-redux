import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import {
  getPlayerPlaylistAsArray,
  getCurrentSongId
} from '../../../modules/reducers';

import { sagaChangeSongAndPlay } from '../../../modules/player/actions';

const mapStateToProps = state => ({
  playerPlaylistSongs: getPlayerPlaylistAsArray(state),
  currentSongId: getCurrentSongId(state)
});

const mapDispatchToProps = dispatch => ({
  handleChangeSong(song) {
    dispatch(sagaChangeSongAndPlay(song));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
