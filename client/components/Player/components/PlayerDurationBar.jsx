import React, { Component, PropTypes } from 'react';
import { formatSecondsAsTime } from 'client/utils/FormatUtils';
import { computeSeekBarPercent } from 'client/utils/PlayerUtils';

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
    const {
      duration,
      currentTime,
      onDurationBarMouseDown,
      onDurationHandleMouseDown,
    } = this.props;
    const percent = computeSeekBarPercent(currentTime, duration);

    return (
      <div
        className="player-seek-bar-wrap"
        onMouseDown={onDurationBarMouseDown}
        onMouseUp={this.handleEndSeek}
      >
        <div className="player-seek-bar" ref={(seekBar) => { this.seekBarElement = seekBar; }}>
          <div className="player-seek-duration-bar" style={{ width: `${percent}%` }} >
            <div className="player-seek-handle" onMouseDown={onDurationHandleMouseDown} />
          </div>
        </div>
      </div>
    );
  }

  renderPlayTime() {
    const { currentTime, duration } = this.props;
    // Move to selectors
    const durationStr = formatSecondsAsTime(duration);
    const currentTimeStr = formatSecondsAsTime(currentTime);

    return (
      <div className="player-time">
        <span>{currentTimeStr}</span>
        <span className="player-time-divider">/</span>
        <span>{durationStr}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="player-section player-seek">
        { this.renderDurationBar() }
        { this.renderPlayTime() }
      </div>
    );
  }
}

PlayerDurationBar.propTypes = {
  seeking: PropTypes.bool,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  onDurationHandleMouseDown: PropTypes.func,
  onDurationHandleMouseMove: PropTypes.func,
  onDurationBarMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
};

export default PlayerDurationBar;
