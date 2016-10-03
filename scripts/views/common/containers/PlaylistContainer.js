import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import {
  getPlayerPlaylistAsArray,
  getShowPlaylist
} from '../../../modules/reducers';

const mapStateToProps = state => ({
  playerPlaylistSongs: getPlayerPlaylistAsArray(state),
  isPlaylistShown: getShowPlaylist(state)
});
export default connect(mapStateToProps)(Playlist);
