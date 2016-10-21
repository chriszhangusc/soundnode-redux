import { connect } from 'react-redux';
import {
  getPlaylistTrackIds,
  isPlaylistHidden
} from 'client/redux/modules/reducers';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTrackIds: getPlaylistTrackIds(state),
  playlistHidden: isPlaylistHidden(state)
});
export default connect(mapStateToProps)(Playlist);
