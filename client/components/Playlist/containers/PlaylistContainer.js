import { connect } from 'react-redux';
import {
  getPlaylistAsArray,
  isPlaylistShown
} from 'client/redux/modules/reducers';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTracks: getPlaylistAsArray(state),
  playlistShown: isPlaylistShown(state)
});
export default connect(mapStateToProps)(Playlist);
