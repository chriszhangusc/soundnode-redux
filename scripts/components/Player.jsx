import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';
class Player extends Component {

  constructor(props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
  }

  formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
    if (min < 10){
      min = "0" + min;
    }
    if (sec < 10){
      sec  = "0" + sec;
    }
    return min + ':' + sec;
  }

  componentDidMount () {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.addEventListener('loadedmetadata', () => {
      console.log(`Playing for ${audioElement.duration} seconds`);
    });

    audioElement.addEventListener('timeupdate', () => {
      var currentTime = Math.floor(audioElement.currentTime).toString();
      var duration = Math.floor(audioElement.duration).toString();
      // console.log(this.formatSecondsAsTime(currentTime));
      // console.log(this.formatSecondsAsTime(duration));
    });

    const {player} = this.props;
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
      <div className="player-seek-duration-bar" style={{ width: `${width}%` }} >
        <div className="player-seek-handle" />
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
    if (player.song === null) return null;

    const streamUrl = `${player.song.stream_url}?client_id=${CLIENT_ID}`;
    return (
      <div className="player">
        <audio id="audio" ref="audio" src={streamUrl}/>
        <div className="container">
          <div className="player-main">
            <div className="player-section player-info">
              <img className="player-image" src="https://i1.sndcdn.com/artworks-000119040504-0va9pb-large.jpg" />
            </div>
            <div className="player-section">
              <div className="player-button">
                <i className="icon ion-ios-rewind" />
              </div>
              {this.renderPlayPauseButton()}
              <div className="player-button" >
                <i className="icon ion-ios-fastforward" />
              </div>
            </div>

            <div className="player-section player-seek">
              <div className="player-seek-bar-wrap">
                <div className="player-seek-bar" ref="seekBar">
                  {this.renderDurationBar()}
                </div>
              </div>
              <div className="player-time">
                <span>2:12</span>
                <span className="player-time-divider">/</span>
                <span>5:30</span>
              </div>
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
