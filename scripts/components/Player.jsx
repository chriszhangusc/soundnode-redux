import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {CLIENT_ID} from '../constants/Config';

import PlayerAudio from './PlayerAudio';
import PlayerSongInfo from './PlayerSongInfo';
import PlayerControls from './PlayerControls';
import PlayerDurationBar from './PlayerDurationBar';
import PlayerVolumeControls from './PlayerVolumeControls';
import PlayerModeControls from './PlayerModeControls';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  render () {
    // Currently playing song
    const {onTimeUpdate} = this.props;
    const {player, onNextClick, onPrevClick, onPlayClick, onPauseClick} = this.props;
    const {onDurationHandleMouseDown, onDurationHandleMouseMove, onDurationHandleMouseUp, onDurationBarMouseDown, onDurationBarMouseUp} = this.props;
    const {onVolumeBarMouseUp, onVolumeBarMouseDown, onVolumeHandleMouseDown, onVolumeHandleMouseMove, onVolumeHandleMouseUp} = this.props;
    // Not sure if we should write this logic here
    const currentSong = player.song;

    return (
      <div className="player">
        <div className="container">
          <div className="player-main">

            <PlayerSongInfo currentSong={currentSong}/>

            <PlayerControls
              isPlaying={player.isPlaying}
              onPlayClick={onPlayClick}
              onPauseClick={onPauseClick}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              />

            <PlayerDurationBar
              player={player}
              onDurationHandleMouseDown={onDurationHandleMouseDown}
              onDurationHandleMouseMove={onDurationHandleMouseMove}
              onDurationHandleMouseUp={onDurationHandleMouseUp}
              onDurationBarMouseDown={onDurationBarMouseDown}
              onDurationBarMouseUp={onDurationBarMouseUp}
              />

            <PlayerModeControls />

            <PlayerVolumeControls
              volume={player.volume}
              player={player}
              onVolumeBarMouseDown={onVolumeBarMouseDown}
              onVolumeBarMouseUp={onVolumeBarMouseUp}
              onVolumeHandleMouseDown={onVolumeHandleMouseDown}
              onVolumeHandleMouseMove={onVolumeHandleMouseMove}
              onVolumeHandleMouseUp={onVolumeHandleMouseUp}
              />

          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
};

export default Player;
