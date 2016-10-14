import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'client/modules/reducers';
import Track from 'client/models/Track';
import PlayerAudioContainer from './PlayerAudioContainer';
import PlayerSongInfoContainer from './PlayerSongInfoContainer';
import PlayerControlsContainer from './PlayerControlsContainer';
import PlayerDurationBarContainer from './PlayerDurationBarContainer';
import PlayerModeControlsContainer from './PlayerModeControlsContainer';
import PlayerVolumeControlsContainer from './PlayerVolumeControlsContainer';

// Player Layout Container
class PlayerContainer extends Component {

  render() {
    // Extract props that we care, and pass the other props as others.
    const { currentTrack } = this.props;
    if (!currentTrack.getId()) {
      return null;
    }
    return (
      <div className="player">
        <div className="container">
          <div className="player-main">
            <PlayerAudioContainer track={currentTrack} />
            <PlayerSongInfoContainer track={currentTrack} />
            <PlayerControlsContainer track={currentTrack} />
            <PlayerDurationBarContainer track={currentTrack} />
            <PlayerModeControlsContainer track={currentTrack} />
            <PlayerVolumeControlsContainer track={currentTrack} />
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  currentTrack: getCurrentPlayerTrack(state)
});

PlayerContainer.propTypes = {
  currentTrack: PropTypes.instanceOf(Track)
};

export default connect(mapStateToProps)(PlayerContainer);
