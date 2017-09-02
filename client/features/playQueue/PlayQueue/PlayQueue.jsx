import React from 'react';
import PropTypes from 'prop-types';
import PlayQueueRow from '../PlayQueueRow';
import PlayQueueHeader from '../PlayQueueHeader';
import Wrapper from './Wrapper';

function PlayQueue(props) {
  const { playQueueTrackIds, playQueueHidden } = props;
  // Do not forget to pass down props to styled components if necessary.
  return (
    <Wrapper playQueueHidden={playQueueHidden}>
      <PlayQueueHeader {...props} />
      <ul className="playlist-list">
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

export default PlayQueue;
