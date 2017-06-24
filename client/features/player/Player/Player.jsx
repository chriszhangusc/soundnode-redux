import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'features/player/playerSelectors';
import styled from 'styled-components';
import { BLACK, LIGHT_BLACK } from 'app/css/colors';
import { Z_MAX } from 'app/css/variables';
import { media } from 'app/css/styleUtils';

import PlayerAudio from '../PlayerAudio';
import PlayerControls from '../PlayerControls';
import PlayerDurationBar from '../PlayerDurationBar';
import PlayerTrackInfo from '../PlayerTrackInfo';
import PlayerModeControls from '../PlayerModeControls';
import PlayerVolumeControls from '../PlayerVolumeControls';

const mapStateToProps = state => ({
  playerTrack: getCurrentPlayerTrack(state),
});

const PlayerWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: ${LIGHT_BLACK};
  border-top: 1px solid ${BLACK};
  z-index: ${Z_MAX};
`;

const PlayerLayout = styled.div`
  ${media.desktop4K`width: 60%;`}
  ${media.desktopLG`width: 70%;`}
  margin: 0 auto;
  display: flex;
  padding: 8px;
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
        <PlayerAudio playerTrack={playerTrack} />
        <PlayerTrackInfo playerTrack={playerTrack} />
        <PlayerControls />
        <PlayerDurationBar playerTrack={playerTrack} />
        <PlayerModeControls />
        <PlayerVolumeControls />
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

export default connect(mapStateToProps)(Player);
