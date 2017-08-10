import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'features/player/playerSelectors';
import styled from 'styled-components';
// import Border from 'common/components/Border';
// import theme from 'app/css/theme';
import Fixed from 'common/components/Fixed';
import BoxShadow from 'common/components/BoxShadow';
import PlayerTimeSection from '../PlayerTimeSection';
import PlayerAudio from '../PlayerAudio';
import PlayerControls from '../PlayerControls';
import PlayerProgressBar from '../PlayerProgressBar';
import PlayerTrackInfo from '../PlayerTrackInfo';
import PlayerModeControls from '../PlayerModeControls';
import PlayerVolumeControls from '../PlayerVolumeControls';

// const Wrapper = styled.div`
//   position: fixed;
//   left: 0;
//   bottom: 0;
//   width: 100%;
//   background-color: ${props => props.theme.colors.bgSub};
//   z-index: ${props => props.theme.zIndexes[2]};
// `;

const FixedBottom = Fixed.extend`
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[2]};
`;

const PlayerWrapper = styled.div`
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
    <FixedBottom>
      <BoxShadow blur={10} spread={4} shade={5}>
        <PlayerWrapper>
          <PlayerProgressBar playerTrack={playerTrack} />
          <PlayerAudio playerTrack={playerTrack} />
          <PlayerTrackInfo playerTrack={playerTrack} />
          <PlayerControls />
          <RightWrapper>
            <PlayerTimeSection playerTrack={playerTrack} />
            <PlayerVolumeControls />
            <PlayerModeControls />
          </RightWrapper>
        </PlayerWrapper>
      </BoxShadow>
    </FixedBottom>
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
