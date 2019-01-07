import React from 'react';
import Wrapper from './Wrapper';
import PlayerVolumeButton from './PlayerVolumeButton';
import PlayerVolumeSeekBar from './PlayerVolumeSeekBar';

function PlayerVolumeControls() {
  return (
    <Wrapper>
      <PlayerVolumeButton />
      <PlayerVolumeSeekBar />
    </Wrapper>
  );
}

export default PlayerVolumeControls;
