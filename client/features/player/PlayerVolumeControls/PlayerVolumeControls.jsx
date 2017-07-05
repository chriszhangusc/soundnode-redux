import React from 'react';
import styled from 'styled-components';
import PlayerVolumeButton from './PlayerVolumeButton';
import PlayerVolumeSeekBar from './PlayerVolumeSeekBar';

const PlayerVolumeControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

function PlayerVolumeControls() {
  return (
    <PlayerVolumeControlsWrapper>
      <PlayerVolumeButton />
      <PlayerVolumeSeekBar />
    </PlayerVolumeControlsWrapper>
  );
}

export default PlayerVolumeControls;
