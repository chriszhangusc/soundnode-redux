import React, {Component, PropTypes} from 'react';
import {formatSecondsAsTime} from '../utils/FormatUtils';
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

  componentDidUpdate () {
    const {player} = this.props;
    const {onSeekMouseUp} = this.props;

    // This will be excuted many times!!!! Fix it!!
    if (player.isSeeking) {
      document.addEventListener('mousemove', this.handleSeekMouseMove);
      document.addEventListener('mouseup', onSeekMouseUp);
    } else {
      document.removeEventListener('mousemove', this.handleSeekMouseMove);
      document.removeEventListener('mouseup', onSeekMouseUp);
    }

  }

  renderDurationBar () {
    const {player, onDurationBarClick, onSeekMouseDown} = this.props;
    let {currentTime} = player;
    let {duration} = player.song;
    // Move these code!!!
    let percent = currentTime * 100.0 / (duration / 1000.0);
    if (percent > 100) percent = 100;
    else if (percent < 0) percent = 0;

    return (
      <div className="player-seek-bar-wrap" onMouseDown={onSeekMouseDown} onMouseUp={this.handleDurationBarMouseUp}>
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
