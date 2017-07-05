import React from 'react';
import PropTypes from 'prop-types';
import { computeOffset } from 'features/player/playerUtils';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as playerActions from 'features/player/playerActions';
import { getCurrentTime, isPlayerSeeking } from 'features/player/playerSelectors';
import PlayerSlider from 'features/player/PlayerSlider';

const PlayerProgressBarWrapper = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  top: -14px;
  left: 90px;
  /* z-index must be bigger than player z-index */
  z-index: 99999;
`;

class PlayerProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSeekKnobMouseDown = this.handleSeekKnobMouseDown.bind(this);
    this.handleSeekKnobMouseMove = this.handleSeekKnobMouseMove.bind(this);
    this.handleSeekKnobMouseUp = this.handleSeekKnobMouseUp.bind(this);
    this.handleProgressBarMouseDown = this.handleProgressBarMouseDown.bind(this);
    this.handleProgressBarMouseUp = this.handleProgressBarMouseUp.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { seeking } = this.props;
    const prevSeeking = prevProps.seeking;

    if (!prevSeeking && seeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleSeekKnobMouseMove);
      document.addEventListener('mouseup', this.handleSeekKnobMouseUp);
    } else if (prevSeeking && !seeking) {
      // Remove listeners when we finish seeking
      document.removeEventListener('mousemove', this.handleSeekKnobMouseMove);
      document.removeEventListener('mouseup', this.handleSeekKnobMouseUp);
    }
  }

  handleSeekKnobMouseDown() {
    this.props.beginSeek();
  }

  // Can not use bind because it will fail when removing listener.
  handleSeekKnobMouseMove(e) {
    const { duration, updateTimeOnSeek } = this.props;
    const newTime = computeOffset(this.seekBar, duration, e);
    updateTimeOnSeek(newTime);
  }

  handleSeekKnobMouseUp(e) {
    const { duration, updateTimeAndEndSeek } = this.props;
    const newTime = computeOffset(this.seekBar, duration, e);
    updateTimeAndEndSeek(newTime);
  }

  handleProgressBarMouseDown() {
    this.props.beginSeek();
  }

  handleProgressBarMouseUp(e) {
    const { duration, updateTimeAndEndSeek } = this.props;
    const newTime = computeOffset(this.seekBar, duration, e);
    updateTimeAndEndSeek(newTime);
  }

  render() {
    const { duration, currentTime } = this.props;
    return (
      <PlayerProgressBarWrapper
        innerRef={(sb) => {
          this.seekBar = sb;
        }}
      >
        <PlayerSlider
          minValue={0}
          maxValue={duration}
          currentValue={currentTime}
          onProgressBarMouseDown={this.handleProgressBarMouseDown}
          onProgressBarMouseUp={this.handleProgressBarMouseUp}
          onSeekKnobMouseDown={this.handleSeekKnobMouseDown}
          onSeekKnobMouseUp={this.handleSeekKnobMouseUp}
        />
      </PlayerProgressBarWrapper>
    );
  }
}

PlayerProgressBar.propTypes = {
  seeking: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  updateTimeOnSeek: PropTypes.func.isRequired,
  beginSeek: PropTypes.func.isRequired,
  updateTimeAndEndSeek: PropTypes.func.isRequired,
};

function mapStateToProps(state, { playerTrack }) {
  return {
    seeking: isPlayerSeeking(state),
    currentTime: getCurrentTime(state),
    duration: playerTrack.duration / 1000.0, // Extract a formatDuration util. convertMsToSec.
  };
}

export default connect(mapStateToProps, playerActions)(PlayerProgressBar);
