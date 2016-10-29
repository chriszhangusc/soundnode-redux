import { connect } from 'react-redux';
import {
  getPlaylistTrackIds,
  isPlaylistHidden,
  clearPlayQueue,
} from 'client/redux/modules/playlist';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTrackIds: getPlaylistTrackIds(state),
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
