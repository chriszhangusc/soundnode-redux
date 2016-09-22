import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentSongId } from '../../selectors/playerSelectors';
import PlayerAudioContainer from './PlayerAudioContainer';
import PlayerSongInfoContainer from './PlayerSongInfoContainer';
import PlayerControlsContainer from './PlayerControlsContainer';
import PlayerDurationBarContainer from './PlayerDurationBarContainer';
import PlayerModeControlsContainer from './PlayerModeControlsContainer';
import PlayerVolumeControlsContainer from './PlayerVolumeControlsContainer';

// Player Layout Container

class Player extends Component {

  render() {
    // Extract props that we care, and pass the other props as others.
    const { currentSongId } = this.props;
    if (!currentSongId) {
      return null;
    }
    return (
      <div className="player">
        <div className="container">
          <div className="player-main">
            <PlayerAudioContainer />
            <PlayerSongInfoContainer />
            <PlayerControlsContainer />
            <PlayerDurationBarContainer />
            <PlayerModeControlsContainer />
            <PlayerVolumeControlsContainer />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  currentSongId: getCurrentSongId(state)
});

Player.propTypes = {
  currentSongId: PropTypes.number
};

export default connect(mapStateToProps)(Player);
