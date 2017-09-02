import { connect } from 'react-redux';
import { clearPlayQueue } from 'features/playQueue/playQueueActions';
import { getPlayQueueByMode, isPlaylistHidden } from 'features/playQueue/playQueueSelectors';
import PlayQueue from './PlayQueue';

const mapStateToProps = state => ({
  playlistTrackIds: getPlayQueueByMode(state),
  playlistHidden: isPlaylistHidden(state),
});

function mapDispatchToProps(dispatch) {
  return {
    handleClearPlayQueue() {
      dispatch(clearPlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueue);
