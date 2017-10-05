import React from 'react';
import PropTypes from 'prop-types';
import { getCurrentTime } from 'features/player/playerSelectors';
import { formatDurationCompact } from 'common/utils/formatUtils';
import { connect } from 'react-redux';
import Wrapper from './Wrapper';
import Time from './Time';
import Separator from './Separator';

function PlayerTimeSection({ currentTime, totalTime }) {
  return (
    <Wrapper>
      <Time>
        {currentTime}
      </Time>
      <Separator>/</Separator>
      <Time>
        {totalTime}
      </Time>
    </Wrapper>
  );
}

PlayerTimeSection.defaultProps = {
  currentTime: '00:00',
  totalTime: '00:00',
};

PlayerTimeSection.propTypes = {
  currentTime: PropTypes.string,
  totalTime: PropTypes.string,
};

function mapStateToProps(state, { playerTrack }) {
  const currentTimeInSec = getCurrentTime(state);
  return {
    currentTime: formatDurationCompact(currentTimeInSec, 'seconds'),
    totalTime: formatDurationCompact(playerTrack.duration),
  };
}

export default connect(mapStateToProps)(PlayerTimeSection);
