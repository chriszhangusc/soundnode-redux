import React, {Component, PropTypes} from 'react';
import {formatSecondsAsTime} from '../utils/FormatUtils';
import {computeCurrentPercent} from '../utils/PlayerUtils';

class PlayerDurationBar extends Component {
  constructor (props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.renderPlayTime = this.renderPlayTime.bind(this);
    this.handleSeekMouseMove = this.handleSeekMouseMove.bind(this);
    this.handleDurationBarClick = this.handleDurationBarClick.bind(this);
    this.handleDurationBarMouseUp = this.handleDurationBarMouseUp.bind(this);
  }

  handleDurationBarClick (e) {
    const {player, onDurationBarClick} = this.props;
    onDurationBarClick(e, this.seekBarElement, player.duration);
  }

  handleSeekMouseMove (e) {
    const {player, onSeekMouseMove} = this.props;
    onSeekMouseMove(e, this.seekBarElement, player.duration);
  }

  handleDurationBarMouseUp (e) {
    const {player, onDurationBarMouseUp} = this.props;
    onDurationBarMouseUp(e, this.seekBarElement, player.duration);
  }

  componentDidUpdate (prevProps) {
    const {player} = this.props;
    const {onSeekMouseUp} = this.props;
    const prevIsSeeking = prevProps.player.isSeeking;

    if (!prevIsSeeking && player.isSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleSeekMouseMove);
      document.addEventListener('mouseup', onSeekMouseUp);
    } else if (prevIsSeeking && !player.isSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleSeekMouseMove);
      document.removeEventListener('mouseup', onSeekMouseUp);
    }

  }

  renderDurationBar () {
    const {player, onDurationBarClick, onSeekMouseDown} = this.props;
    let {currentTime} = player;
    let duration = player.song.duration / 1000.0;
    // Move these code!!!
    let percent = computeCurrentPercent(currentTime, duration);

    return (
      <div className="player-seek-bar-wrap"
        onMouseDown={onSeekMouseDown}
        onMouseUp={this.handleDurationBarMouseUp}>
        <div className="player-seek-bar" ref={seekBar => this.seekBarElement = seekBar}>
          <div className="player-seek-duration-bar" style={{ width: `${percent}%` }} >
            <div className="player-seek-handle" onMouseDown={ onSeekMouseDown } />
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

const propTypes = {
  audio: PropTypes.object,
};

PlayerDurationBar.propTypes = propTypes;

export default PlayerDurationBar;
