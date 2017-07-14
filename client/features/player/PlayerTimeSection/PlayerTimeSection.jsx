import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontColorSub } from 'app/css/colors';
import { getCurrentTime } from 'features/player/playerSelectors';
import { formatDuration } from 'common/utils/formatUtils';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100%;
  overflow: hidden;
  height: 32px;
  display: flex;
  margin-right: 40px;
  align-items: center;
  justify-content: flex-end;
`;

const Span = styled.span`
  font-size: 0.9rem;
  color: ${fontColorSub};
`;

const SeparatorSpan = Span.extend`margin: 0 5px;`;

function PlayerTimeSection({ currentTime, totalTime }) {
  return (
    <Wrapper>
      <Span>
        {currentTime}
      </Span>
      <SeparatorSpan>/</SeparatorSpan>
      <Span>
        {totalTime}
      </Span>
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
    currentTime: formatDuration(currentTimeInSec, 'seconds'),
    totalTime: formatDuration(playerTrack.duration),
  };
}

export default connect(mapStateToProps)(PlayerTimeSection);
