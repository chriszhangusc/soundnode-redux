import { connect } from 'react-redux';
import { clearPlayQueue } from 'features/playQueue/playQueueActions';
import { getPlayQueueByMode, isPlayQueueHidden } from 'features/playQueue/playQueueSelectors';
import PlayQueue from './PlayQueue';

const mapStateToProps = state => ({
  playQueueTrackIds: getPlayQueueByMode(state),
  playQueueHidden: isPlayQueueHidden(state),
});

function mapDispatchToProps(dispatch) {
  return {
    handleClearPlayQueue() {
      dispatch(clearPlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueue);
