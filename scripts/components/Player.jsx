import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';


import PlayerSongInfo from './PlayerSongInfo';
import PlayerControls from './PlayerControls';
import PlayerDurationBar from './PlayerDurationBar';
class Player extends Component {

  constructor(props) {
    super(props);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    // this.removeEventListeners = this.removeEventListeners.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }


  componentDidMount () {
    // Props here will be its initial value!! Not actual value!!
    const { handleTimeUpdate, player } = this.props;
    const audioElement = this._audio;

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
    const audioElement = this._audio;
    const prevSong = prevProps.player.song;
    const newSong = player.song;

    // This is for changing song in main song card.
    if (prevSong.id !== newSong.id) {
      audioElement.play();
    }


    if (audioElement.paused === player.isPlaying) {
      audioElement.paused ? audioElement.play(): audioElement.pause();
    }

  }

  componentWillUnmount () {
    // this.removeEventListeners();
  }

  onTimeUpdate (e) {
    const {handleTimeUpdate} = this.props;
    handleTimeUpdate(e.target.currentTime);
  }

  onEnded (e) {
    const {player, handleSongEnded, playNextSong} = this.props;

    // Check the current playing type (Repeat / Shuffle / (default)In order)
    playNextSong();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  render () {
    // Currently playing song
    const {player, playNextSong, playPrevSong, onPlayClick, onPauseClick} = this.props;
    const {onSeekMouseDown, onSeekMouseMove, onSeekMouseUp, onDurationBarClick} = this.props;
    // Not sure if we should write this logic here
    const currentSong = player.song;

    const streamUrl = `${player.song.stream_url}?client_id=${CLIENT_ID}`;
    return (
      <div className="player">
        <audio id="audio" ref={audio => this._audio = audio} src={streamUrl}/>
        <div className="container">
          <div className="player-main">
            <PlayerSongInfo currentSong={currentSong}/>

            <PlayerControls
              isPlaying={player.isPlaying}
              onPlayClick={onPlayClick.bind(null, currentSong, this._audio)}
              onPauseClick={onPauseClick.bind(null, this._audio)}
              playPrevSong={playPrevSong}
              playNextSong={playNextSong} />

            <PlayerDurationBar
              audio = {this._audio}
              player = {player}
              onSeekMouseDown={onSeekMouseDown}
              onSeekMouseMove={onSeekMouseMove}
              onSeekMouseUp={onSeekMouseUp}
              onDurationBarClick={onDurationBarClick}
              />

            <div className="player-section">
              <div className={`player-button ${(false ? ' active' : '')}`}>
                <i className="icon ion-loop" />
              </div>

              <div className={`player-button ${(true ? ' active' : '')}`}>
                <i className="icon ion-shuffle" />
              </div>
            </div>
            <div className="player-section">
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

Player.propTypes = {
  onPlayClick: PropTypes.func.isRequired
};

export default Player;
