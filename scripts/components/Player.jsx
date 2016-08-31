import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';
import {playSong, pauseSong} from '../actions/activeSong';
class Player extends Component {

  constructor(props) {
    super(props);
    this.renderDurationBar = this.renderDurationBar.bind(this);
    this.play = this.play.bind(this);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
  }

  componentDidMount () {
    const {activeSong} = this.props;
    if (activeSong.isPlaying) {
        this.play();
    } else {
      this.pause();
    }
  }

  componentDidUpdate () {
    const {activeSong} = this.props;
    if (activeSong.isPlaying) {
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
    const {activeSong, playSong, pauseSong} = this.props;
    return (
      <div className="player-button">
        <i
          className={activeSong.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
          onClick={activeSong.isPlaying ? pauseSong : playSong}
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
    const {activeSong} = this.props;

    const streamUrl = `${activeSong.song.stream_url}?client_id=${CLIENT_ID}`;
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
