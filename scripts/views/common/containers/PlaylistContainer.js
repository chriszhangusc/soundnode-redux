import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import {
  getPlayerPlaylistAsArray,
} from '../../../modules/reducers';

const mapStateToProps = state => ({
  playerPlaylistSongs: getPlayerPlaylistAsArray(state)
});
export default connect(mapStateToProps)(Playlist);
