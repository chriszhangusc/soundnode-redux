import { connect } from 'react-redux';
import {
  getPlaylistByMode,
  isPlaylistHidden,
  clearPlayQueue,
} from 'client/redux/modules/playlist';

import Playlist from '../components/Playlist';

const mapStateToProps = state => ({
  playlistTrackIds: getPlaylistByMode(state),
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
