import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WHITE, THEME_COLOR } from 'client/app/css/colors';
import { formatSecondsAsTime } from 'client/common/utils/FormatUtils';
import { computeSeekBarPercent } from 'client/common/utils/PlayerUtils';
import styled from 'styled-components';

const PlayerDurationBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  flex: 1;
`;

const PlayTimeWrapper = styled.div`
  margin-left: 30px;
  color: ${WHITE};
  font-size: 11px;
`;

const PlayTimeSeparator = styled.span`
  margin: 0 10px;
`;

const PlayerSeekBarWrapper = styled.div`
  padding: 6px 0;
  flex: 1;

  &:hover {
    cursor: pointer;
  }
`;

const PlayerSeekBar = styled.div`
  position: relative;
  height: 2px;
  background-color: ${WHITE};
`;

const PlayerSeekDurationBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${THEME_COLOR};
`;

const PlayerSeekHandle = styled.div`
  position: absolute;
  top: -5px;
  right: -6px;
  width: 12px;
  height: 12px;
  background-color: ${WHITE};
  border-radius: 50%;
  border: 1px solid ${WHITE};
`;

class PlayerDurationBar extends Component {
  constructor(props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.renderPlayTime = this.renderPlayTime.bind(this);
    this.handleDurationHandleMouseMove = this.handleDurationHandleMouseMove.bind(this);
    this.handleEndSeek = this.handleEndSeek.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { seeking } = this.props;
    const prevSeeking = prevProps.seeking;

    if (!prevSeeking && seeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.addEventListener('mouseup', this.handleEndSeek);
    } else if (prevSeeking && !seeking) {
      // Remove listeners when we finish seeking
      document.removeEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.removeEventListener('mouseup', this.handleEndSeek);
    }
  }

  handleEndSeek(e) {
    const { duration, onMouseUp } = this.props;
    onMouseUp(this.seekBarElement, duration, e);
  }

  // Can not use bind because it will fail when removing listener.
  handleDurationHandleMouseMove(e) {
    const { duration, onDurationHandleMouseMove } = this.props;
    onDurationHandleMouseMove(this.seekBarElement, duration, e);
  }

  renderDurationBar() {
    const { duration, currentTime, onDurationBarMouseDown, onDurationHandleMouseDown } = this.props;
    const percent = computeSeekBarPercent(currentTime, duration);

    return (
      <PlayerSeekBarWrapper onMouseDown={onDurationBarMouseDown} onMouseUp={this.handleEndSeek}>
        <PlayerSeekBar innerRef={(seekBar) => { this.seekBarElement = seekBar; }} >
          <PlayerSeekDurationBar style={{ width: `${percent}%` }}>
            <PlayerSeekHandle onMouseDown={onDurationHandleMouseDown} />
          </PlayerSeekDurationBar>
        </PlayerSeekBar>
      </PlayerSeekBarWrapper>
    );
  }

  renderPlayTime() {
    const { currentTime, duration } = this.props;
    // Move to selectors
    const durationStr = formatSecondsAsTime(duration);
    const currentTimeStr = formatSecondsAsTime(currentTime);

    return (
      <PlayTimeWrapper>
        <span>{currentTimeStr}</span>
        <PlayTimeSeparator>/</PlayTimeSeparator>
        <span>{durationStr}</span>
      </PlayTimeWrapper>
    );
  }

  render() {
    return (
      <PlayerDurationBarWrapper>
        {this.renderDurationBar()}
        {this.renderPlayTime()}
      </PlayerDurationBarWrapper>
    );
  }
}

PlayerDurationBar.propTypes = {
  seeking: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onDurationHandleMouseDown: PropTypes.func.isRequired,
  onDurationHandleMouseMove: PropTypes.func.isRequired,
  onDurationBarMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
};

export default PlayerDurationBar;
