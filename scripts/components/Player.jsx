import React, {Component, PropTypes} from 'react';
import PlayerSongInfo from './PlayerSongInfo';
import PlayerControls from './PlayerControls';
import PlayerDurationBar from './PlayerDurationBar';
import PlayerVolumeControls from './PlayerVolumeControls';
import PlayerModeControls from './PlayerModeControls';

class Player extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="player">
        <div className="container">
          <div className="player-main">
            <PlayerSongInfo {...this.props} />
            <PlayerControls {...this.props} />
            <PlayerDurationBar {...this.props} />
            <PlayerModeControls {...this.props}/>
            <PlayerVolumeControls {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}


Player.propTypes = {
};

export default Player;
