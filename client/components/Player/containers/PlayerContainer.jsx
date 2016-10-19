import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'client/redux/modules/reducers';
import Track from 'client/models/Track';
import { formatStreamUrl } from 'client/utils/FormatUtils';
import PlayerAudioContainer from './PlayerAudioContainer';
import PlayerSongInfoContainer from './PlayerSongInfoContainer';
import PlayerControlsContainer from './PlayerControlsContainer';
import PlayerDurationBarContainer from './PlayerDurationBarContainer';
import PlayerModeControlsContainer from './PlayerModeControlsContainer';
import PlayerVolumeControlsContainer from './PlayerVolumeControlsContainer';

// Player Layout Container
class PlayerContainer extends Component {

  render() {
    console.log('Render: PlayerContainer(Top level)');
    // Extract props that we care, and pass the other props as others.
    const { currentTrack } = this.props;
    if (!currentTrack.getId()) {
      return null;
    }
    return (
      <div className="player">
        <div className="container">
          <div className="player-main">
            <PlayerAudioContainer
              streamUrl={formatStreamUrl(currentTrack.getStreamUrl())}
            />
            <PlayerSongInfoContainer track={currentTrack} />
            <PlayerControlsContainer />
            <PlayerDurationBarContainer duration={currentTrack.getDuration()} />
            <PlayerModeControlsContainer />
            <PlayerVolumeControlsContainer />
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
  currentTrack: PropTypes.instanceOf(Track).isRequired
};

export default connect(mapStateToProps)(PlayerContainer);
