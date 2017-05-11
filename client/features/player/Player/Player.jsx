import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'client/features/player/playerSelectors';
import styled from 'styled-components';
import { BLACK, LIGHT_BLACK } from 'client/app/css/colors';
import { Z_MAX } from 'client/app/css/variables';

import PlayerAudio from '../PlayerAudio';
import PlayerControls from '../PlayerControls';
import PlayerDurationBar from '../PlayerDurationBar';
import PlayerTrackInfo from '../PlayerTrackInfo';
import PlayerModeControls from '../PlayerModeControls';
import PlayerVolumeControls from '../PlayerVolumeControls';

const mapStateToProps = state => ({
  playerTrack: getCurrentPlayerTrack(state),
});

// .player {
//     // Fix it on bottom left.
//     position: fixed;
//     left: 0;
//     bottom: 0;
//     width: 100%;
//     background-color: $player-bg-color;
//     border-top: 1px solid $player-border-color;
//     -moz-user-select: none;
//     -webkit-user-select: none;
//     -ms-user-select: none;
//     z-index: $z-max; // Make sure it is always on top

//     .song-card-details {
//         overflow: hidden;
//     }
// }

const PlayerWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${LIGHT_BLACK};
  border-top: 1px solid ${BLACK};
  z-index: ${Z_MAX};
`;

const PlayerLayout = styled.div`
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
      <PlayerLayout className="container">
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
