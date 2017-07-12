// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'features/player/playerSelectors';
import styled from 'styled-components';
import { BLACK, LIGHT_BLACK } from 'app/css/colors';
import { zIndexPlayer } from 'app/css/zIndex';
import PlayerTimeSection from '../PlayerTimeSection';
import PlayerAudio from '../PlayerAudio';
import PlayerControls from '../PlayerControls';
import PlayerProgressBar from '../PlayerProgressBar';
import PlayerTrackInfo from '../PlayerTrackInfo';
import PlayerModeControls from '../PlayerModeControls';
import PlayerVolumeControls from '../PlayerVolumeControls';

const PlayerWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 90px;
  background-color: ${LIGHT_BLACK};
  border-top: 1px solid ${BLACK};
  z-index: ${zIndexPlayer};
`;

const PlayerLayout = styled.div`
  margin: 0 auto;
  display: flex;
  position: relative;
`;

const RightWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

function Player({ playerTrack }) {
  if (!playerTrack || !playerTrack.id) {
    return null;
  }
  // Do not pass down specific data required by its children,
  // just pass track down and let the children's  do their job
  return (
    <PlayerWrapper>
      <PlayerLayout>
        <PlayerProgressBar playerTrack={playerTrack} />
        <PlayerAudio playerTrack={playerTrack} />
        <PlayerTrackInfo playerTrack={playerTrack} />
        <PlayerControls />
        <RightWrapper>
          <PlayerTimeSection playerTrack={playerTrack} />
          <PlayerVolumeControls />
          <PlayerModeControls />
        </RightWrapper>
      </PlayerLayout>
    </PlayerWrapper>
  );
}

Player.defaultProps = {
  playerTrack: null,
};

Player.propTypes = {
  playerTrack: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    playerTrack: getCurrentPlayerTrack(state),
  };
}

export default connect(mapStateToProps)(Player);
