import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';

import {formatSecondsAsTime} from '../utils/FormatUtils';

class Player extends Component {

  constructor(props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  componentDidMount () {
    const { handleTimeUpdate, player } = this.props;

    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    audioElement.addEventListener('loadedmetadata', () => {
      console.log(`Playing for ${audioElement.duration} seconds`);
    });

    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    if (player.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  componentDidUpdate () {
    const {player} = this.props;
    if (player.isPlaying) {
        this.play();
    } else {
      this.pause();
    }
  }

  renderDurationBar () {
    let width = 40;
    return (
      <div className="player-seek-bar-wrap">
        <div className="player-seek-bar" ref="seekBar">
          <div className="player-seek-duration-bar" style={{ width: `${width}%` }} >
            <div className="player-seek-handle" />
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
          onClick={player.isPlaying ? pauseSong : playSong.bind(null, player.song)}
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

  pause() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.pause();
  }

  play() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.play();
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
