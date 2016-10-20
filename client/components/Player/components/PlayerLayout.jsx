import React, { PropTypes } from 'react';
import Track from 'client/models/Track';
import PlayerAudioContainer from '../containers/PlayerAudioContainer';
import PlayerControlsContainer from '../containers/PlayerControlsContainer';
import PlayerDurationBarContainer from '../containers/PlayerDurationBarContainer';
import PlayerTrackInfoContainer from '../containers/PlayerTrackInfoContainer';
import PlayerModeControlsContainer from '../containers/PlayerModeControlsContainer';
import PlayerVolumeControlsContainer from '../containers/PlayerVolumeControlsContainer';

const PlayerLayout = ({ playerTrack }) => {
// console.log(playerTrack);
  // Do not display Player if there is no track to play.
  if (!playerTrack || !playerTrack.getId()) {
    return null;
  }
console.log('Render: PlayerContainer(Top level)');
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
};

PlayerLayout.propTypes = {
  playerTrack: PropTypes.instanceOf(Track)
};

export default PlayerLayout;
