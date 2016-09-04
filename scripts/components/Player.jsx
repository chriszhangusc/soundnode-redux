import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';

import {formatSecondsAsTime} from '../utils/FormatUtils';

class Player extends Component {

  constructor(props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
    this.onSeekMouseMove = this.onSeekMouseMove.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.onPauseClick = this.onPauseClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    // this.removeEventListeners = this.removeEventListeners.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onDurationBarClick = this.onDurationBarClick.bind(this);
    this.seek = this.seek.bind(this);
  }

  onPauseClick() {
    const {pauseSong} = this.props;
    pauseSong();
    this.refs.audio.pause();
  }

  onPlayClick() {
    const {playSong, player} = this.props;
    playSong(player.song);
    this.refs.audio.play(player.song);
  }

  componentDidMount () {
    // Props here will be its initial value!! Not actual value!!
    const { handleTimeUpdate, player } = this.props;
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    audioElement.addEventListener('loadedmetadata', () => {
      // console.log(`Playing for ${audioElement.duration} seconds`);
    });
    audioElement.addEventListener('timeupdate', this.onTimeUpdate);
    audioElement.addEventListener('ended', this.onEnded);
    if (audioElement.paused && player.isPlaying) {
      audioElement.play();
    }
  }

  componentDidUpdate (prevProps) {
    const {player} = this.props;
    const audioElement = this.refs.audio;
    const prevSong = prevProps.player.song;
    const newSong = player.song;

    // This is for changing song in main song card.
    if (prevSong.id !== newSong.id) {
      audioElement.play();
    }

    
    if (audioElement.paused === player.isPlaying) {
      audioElement.paused ? audioElement.play(): audioElement.pause();
    }

    // ReactDOM.findDOMNode(this.refs.audio).play();
  }

  componentWillUnmount () {
    // this.removeEventListeners();
  }

  onTimeUpdate (e) {
    const {handleTimeUpdate} = this.props;
    handleTimeUpdate(e.target.currentTime);
  }

  onEnded (e) {
    const {player, handleSongEnded, handleNext} = this.props;

    // Check the current playing type (Repeat / Shuffle / (default)In order)
    // handleSongEnded();
    handleNext();
    this.refs.audio.play();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  onSeekMouseDown () {
    const {toggleSeek} = this.props;
    toggleSeek();
    document.addEventListener('mousemove', this.onSeekMouseMove);
    document.addEventListener('mouseup', this.onSeekMouseUp);
  }

  // We have to put mouseup event listener to document to handle user release mouse on any point of the page.
  onSeekMouseUp () {
    const {toggleSeek, player} = this.props;
    if (!player.isSeeking) return ;
    toggleSeek();
    document.removeEventListener('mousemove', this.onSeekMouseMove);
    document.removeEventListener('mouseup', this.onSeekMouseUp);
    // set new time to audio dom
    this.refs.audio.currentTime = player.currentTime;
  }

  seek (e, updateTime) {
    const {player, handleSeekTimeUpdate} = this.props;
    const seekBar = this.refs.seekBar;
    let offset = e.clientX - seekBar.offsetLeft;
    let width = seekBar.offsetWidth;
    if (offset < 0) {
      offset = 0;
    } else if (offset > width) {
      offset = width;
    }

    const cursorPercent = offset * 1.0 / width;
    const {currentTime} = this.props.player;
    const duration = this.props.player.song.duration / 1000.0;
    // compute new currentTime

    const newTime = Math.floor(duration * cursorPercent);
    // ONLY UPDATE currenttime in STATE!
    handleSeekTimeUpdate(newTime);
    if (updateTime) this.refs.audio.currentTime = newTime;
  }

  onSeekMouseMove (e) {
    this.seek(e, false);
  }

  onDurationBarClick (e) {
    this.seek(e, true);
  }

  /* Rendering functions */

  renderDurationBar () {
    const {player} = this.props;
    let {currentTime} = player;
    let {duration} = player.song;
    let percent = currentTime * 100.0 / (duration / 1000.0);
    if (percent > 100) percent = 100;
    else if (percent < 0) percent = 0;
    return (
      <div className="player-seek-bar-wrap" onClick={this.onDurationBarClick}>
        <div className="player-seek-bar" ref="seekBar">
          <div className="player-seek-duration-bar" style={{ width: `${percent}%` }} >
            <div className="player-seek-handle" onMouseDown={ this.onSeekMouseDown } />
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



  renderPlayPauseButton () {
    const {player, playSong, pauseSong} = this.props;
    return (
      <div className="player-button">
        <i
          className={player.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
          onClick={player.isPlaying ? this.onPauseClick : this.onPlayClick}
          />
      </div>
    );
  }

  renderForwardButton () {
    const {handleNext} = this.props;
    return (
      <div className="player-button" onClick={handleNext}>
        <i className="icon ion-ios-fastforward" />
      </div>
    );
  }

  renderBackwardButton () {
    const {handlePrev} = this.props;
    return (
      <div className="player-button" onClick={handlePrev}>
        <i className="icon ion-ios-rewind" />
      </div>
    );
  }

  render () {
    // Currently playing song
    const {player} = this.props;
    // Not sure if we should write this logic here
    const currentSong = player.song;

    const streamUrl = `${player.song.stream_url}?client_id=${CLIENT_ID}`;
    return (
      <div className="player">
        <audio id="audio" ref="audio" src={streamUrl}/>
        <div className="container">
          <div className="player-main">
            <div className="player-section player-info">
              <img className="player-image" src={currentSong.artwork_url} />
            </div>

            <div className="player-section">
              {this.renderBackwardButton()}
              {this.renderPlayPauseButton()}
              {this.renderForwardButton()}
            </div>

            <div className="player-section player-seek">
              { this.renderDurationBar() }
              { this.renderPlayTime() }
            </div>

            <div className="player-section">
              <div className={`player-button ${(false ? ' active' : '')}`}>
                <i className="icon ion-loop" />
              </div>

              <div className={`player-button ${(true ? ' active' : '')}`}>
                <i className="icon ion-shuffle" />
              </div>

              <div className="player-button player-volume-button" >
                <div className="player-volume-button-wrap">
                  <i className="icon ion-android-volume-down" />
                  <i className="icon ion-android-volume-mute" />
                </div>
              </div>

              <div className="player-volume">
                <div className="player-seek-bar-wrap" onClick={this.changeVolume}>
                  <div className="player-seek-bar" ref="volumeBar">
                    <div className="player-seek-duration-bar" style={{ width: `50%` }} >
                      <div className="player-seek-handle"/>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Player;
