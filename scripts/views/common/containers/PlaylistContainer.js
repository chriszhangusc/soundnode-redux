import { connect } from 'react-redux';
import Playlist from '../components/Playlist';
import {
  getPlayerPlaylistAsArray,
  getCurrentSongId
} from '../../../modules/reducers';

const mapStateToProps = state => ({
  playerPlaylistSongs: getPlayerPlaylistAsArray(state),
  currentSongId: getCurrentSongId(state)
});

const mapDispatchToProps = dispatch => ({
  handleItemClick: () => {
    console.log('Item clicked');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
