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
    const {onSeekMouseDown, onSeekMouseMove, onSeekMouseUp, onDurationBarClick, onDurationBarMouseUp} = this.props;
    // Not sure if we should write this logic here
    const currentSong = player.song;

    const streamUrl = `${player.song.stream_url}?client_id=${CLIENT_ID}`;
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
              audio={this._audio}
              player={player}
              onSeekMouseDown={onSeekMouseDown}
              onSeekMouseMove={onSeekMouseMove}
              onSeekMouseUp={onSeekMouseUp}
              onDurationBarClick={onDurationBarClick}
              onDurationBarMouseUp={onDurationBarMouseUp}
              />

            <PlayerModeControls />

            <PlayerVolumeControls />

          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
};

export default Player;
