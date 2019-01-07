import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearPlayQueue } from '@soundnode-redux/client/src/features/playQueue/playQueueActions';
import { getPlayQueueByMode, isPlayQueueHidden } from '@soundnode-redux/client/src/features/playQueue/playQueueSelectors';
import PlayQueueRow from '../PlayQueueRow';
import PlayQueueHeader from '../PlayQueueHeader';
import Wrapper from './Wrapper';

function PlayQueue(props) {
  const { playQueueTrackIds, playQueueHidden } = props;
  // Do not forget to pass down props to styled components if necessary.
  return (
    <Wrapper playQueueHidden={playQueueHidden}>
      <PlayQueueHeader {...props} />
      <ul>
        {playQueueTrackIds.map(
          (trackId, idx) =>
            trackId && <PlayQueueRow trackId={trackId} index={idx + 1} key={trackId.toString()} />,
        )}
      </ul>
    </Wrapper>
  );
}

PlayQueue.defaultProps = {
  playQueueTrackIds: [],
};

PlayQueue.propTypes = {
  playQueueHidden: PropTypes.bool.isRequired,
  playQueueTrackIds: PropTypes.arrayOf(PropTypes.number),
};

function mapStateToProps(state) {
  return {
    playQueueTrackIds: getPlayQueueByMode(state),
    playQueueHidden: isPlayQueueHidden(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClearPlayQueue() {
      dispatch(clearPlayQueue());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueue);
