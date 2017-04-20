import { connect } from 'react-redux';
import { clearPlayQueue } from 'client/redux/modules/playlist/actions';
import { getPlaylistByMode, isPlaylistHidden } from 'client/redux/modules/playlist/selectors';
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
