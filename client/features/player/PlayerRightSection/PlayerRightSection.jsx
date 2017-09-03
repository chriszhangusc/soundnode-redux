import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import PlayerTimeSection from './PlayerTimeSection';
import PlayerVolumeControls from './PlayerVolumeControls';
import PlayerModeControls from './PlayerModeControls';

function PlayerRightSection({ playerTrack }) {
  return (
    <Wrapper>
      <PlayerTimeSection playerTrack={playerTrack} />
      <PlayerVolumeControls />
      <PlayerModeControls />
    </Wrapper>
  );
}

PlayerRightSection.propTypes = {
  playerTrack: PropTypes.object.isRequired,
};

export default PlayerRightSection;
