import React from 'react';
import PropTypes from 'prop-types';
import PlayerAudioContainer from '../containers/PlayerAudioContainer';
import PlayerControlsContainer from '../containers/PlayerControlsContainer';
import PlayerDurationBarContainer from '../containers/PlayerDurationBarContainer';
import PlayerTrackInfoContainer from '../containers/PlayerTrackInfoContainer';
import PlayerModeControlsContainer from '../containers/PlayerModeControlsContainer';
import PlayerVolumeControlsContainer from '../containers/PlayerVolumeControlsContainer';

function PlayerLayout({ playerTrack }) {
  if (!playerTrack || !playerTrack.id) {
    return null;
  }
  // Do not pass down specific data required by its children,
  // just pass track down and let the children's container do their job
  return (
    <div className="player">
      <div className="container">
        <div className="player-main">
          <PlayerAudioContainer playerTrack={playerTrack} />
          <PlayerTrackInfoContainer playerTrack={playerTrack} />
          <PlayerControlsContainer />
          <PlayerDurationBarContainer playerTrack={playerTrack} />
          <PlayerModeControlsContainer />
          <PlayerVolumeControlsContainer />
        </div>
      </div>
    </div>
  );
}

PlayerLayout.defaultProps = {
  playerTrack: null,
};

PlayerLayout.propTypes = {
  playerTrack: PropTypes.object,
};

export default PlayerLayout;
