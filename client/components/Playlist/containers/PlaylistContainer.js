import { connect } from 'react-redux';
import {
  getPlaylistAsArray,
  getShowPlaylist
} from 'client/redux/modules/reducers';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTracks: getPlaylistAsArray(state),
  isPlaylistShown: getShowPlaylist(state)
});
export default connect(mapStateToProps)(Playlist);
