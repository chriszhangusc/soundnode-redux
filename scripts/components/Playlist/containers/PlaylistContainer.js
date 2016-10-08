import { connect } from 'react-redux';
import {
  getPlayerPlaylistAsArray,
  getShowPlaylist
} from 'client/modules/reducers';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playerPlaylistSongs: getPlayerPlaylistAsArray(state),
  isPlaylistShown: getShowPlaylist(state)
});
export default connect(mapStateToProps)(Playlist);
