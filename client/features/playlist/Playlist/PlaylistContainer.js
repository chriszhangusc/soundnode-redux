import { connect } from 'react-redux';
import { clearPlayQueue } from 'features/playlist/playlistActions';
import { getPlaylistByMode, isPlaylistHidden } from 'features/playlist/playlistSelectors';
import Playlist from './Playlist';

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
