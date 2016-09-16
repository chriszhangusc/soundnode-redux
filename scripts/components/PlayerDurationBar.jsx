import React, {Component, PropTypes} from 'react';
import {formatSecondsAsTime} from '../utils/FormatUtils';
import {computeSeekBarPercent} from '../utils/PlayerUtils';

class PlayerDurationBar extends Component {
  constructor (props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.renderPlayTime = this.renderPlayTime.bind(this);
    this.handleDurationHandleMouseMove = this.handleDurationHandleMouseMove.bind(this);
  }

  componentDidUpdate (prevProps) {
    const {isSeeking} = this.props;
    const {onDurationHandleMouseUp} = this.props;
    const prevIsSeeking = prevProps.isSeeking;

    if (!prevIsSeeking && isSeeking) {
      console.log('Begin Seeking');
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.addEventListener('mouseup', onDurationHandleMouseUp);
    } else if (prevIsSeeking && !isSeeking) {
      // Remove them only when we finish seeking
      console.log('End Seeking');
      document.removeEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.removeEventListener('mouseup', onDurationHandleMouseUp);
    }

  }

  // Can not use bind because it will fail when removing listener.
  handleDurationHandleMouseMove (e) {
    const {duration, onDurationHandleMouseMove} = this.props;
    onDurationHandleMouseMove(this.seekBarElement, duration, e);
  }

  renderDurationBar () {
    const {
      duration,
      currentTime,
      onDurationBarMouseUp,
      onDurationBarMouseDown,
      onDurationHandleMouseDown
    } = this.props;
    let percent = computeSeekBarPercent(currentTime, duration);

    return (
      <div className="player-seek-bar-wrap"
        onMouseDown={onDurationBarMouseDown}
        onMouseUp={onDurationBarMouseUp.bind(null, this.seekBarElement, duration)}
        >
        <div className="player-seek-bar" ref={seekBar => this.seekBarElement = seekBar}>
          <div className="player-seek-duration-bar" style={{ width: `${percent}%` }} >
            <div className="player-seek-handle" onMouseDown={ onDurationHandleMouseDown } />
          </div>
        </div>
      </div>
    );
  }

  renderPlayTime () {

    const {currentTime, duration} = this.props;
    // Move to selectors
    let durationStr = formatSecondsAsTime(duration);
    let currentTimeStr = formatSecondsAsTime(currentTime);

    return (
      <div className="player-time">
        <span>{currentTimeStr}</span>
        <span className="player-time-divider">/</span>
        <span>{durationStr}</span>
      </div>
    );
  }

  render () {
    return (
      <div className="player-section player-seek">
        { this.renderDurationBar() }
        { this.renderPlayTime() }
      </div>
    );
  }
}

PlayerDurationBar.propTypes = {
  isSeeking: PropTypes.bool,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  onDurationHandleMouseDown: PropTypes.func,
  onDurationHandleMouseMove: PropTypes.func,
  onDurationHandleMouseUp: PropTypes.func,
  onDurationBarMouseDown: PropTypes.func,
  onDurationBarMouseUp: PropTypes.func

};

export default PlayerDurationBar;
