import { connect } from 'react-redux';
import {
  getActivePlaylist,
  isPlaylistHidden,
  clearPlayQueue,
} from 'client/redux/modules/playlist';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTrackIds: getActivePlaylist(state),
  playlistHidden: isPlaylistHidden(state),
});

function mapDispatchToProps(dispatch) {
  return {
    handleClearPlayQueue() {
      dispatch(clearPlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
