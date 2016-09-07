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

  // Can not use bind because it will fail when removing listener.
  handleDurationHandleMouseMove (e) {
    const {player, onDurationHandleMouseMove} = this.props;
    onDurationHandleMouseMove(this.seekBarElement, player.duration, e);
  }

  componentDidUpdate (prevProps) {
    const {player} = this.props;
    const {onDurationHandleMouseUp} = this.props;
    const prevIsSeeking = prevProps.player.isSeeking;

    if (!prevIsSeeking && player.isSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.addEventListener('mouseup', onDurationHandleMouseUp);
    } else if (prevIsSeeking && !player.isSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleDurationHandleMouseMove);
      document.removeEventListener('mouseup', onDurationHandleMouseUp);
    }

  }

  renderDurationBar () {
    const {player, onDurationBarMouseUp, onDurationBarMouseDown, onDurationHandleMouseDown } = this.props;
    let {currentTime} = player;
    // Use Reselect here?
    let duration = player.song.duration / 1000.0;

    let percent = computeSeekBarPercent(currentTime, duration);

    return (
      <div className="player-seek-bar-wrap"
        onMouseDown={onDurationBarMouseDown}
        onMouseUp={onDurationBarMouseUp.bind(null, this.seekBarElement, player.duration)}>
        <div className="player-seek-bar" ref={seekBar => this.seekBarElement = seekBar}>
          <div className="player-seek-duration-bar" style={{ width: `${percent}%` }} >
            <div className="player-seek-handle" onMouseDown={ onDurationHandleMouseDown } />
          </div>
        </div>
      </div>
    );
  }

  renderPlayTime () {

    const {player} = this.props;
    let {currentTime} = player;
    let {duration} = player.song;
    let durationStr = formatSecondsAsTime(duration / 1000.0);
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
};

export default PlayerDurationBar;