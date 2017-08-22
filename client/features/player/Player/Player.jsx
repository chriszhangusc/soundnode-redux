import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'features/player/playerSelectors';
import BoxShadow from 'common/components/BoxShadow';
import PlayerTimeSection from '../PlayerTimeSection';
import PlayerAudio from '../PlayerAudio';
import PlayerControls from '../PlayerControls';
import PlayerProgressBar from '../PlayerProgressBar';
import PlayerTrackInfo from '../PlayerTrackInfo';
import PlayerModeControls from '../PlayerModeControls';
import PlayerVolumeControls from '../PlayerVolumeControls';
import OuterWrapper from './OuterWrapper';
import ContentWrapper from './ContentWrapper';
import RightSectionWrapper from './RightSectionWrapper';

function Player({ playerTrack }) {
  if (!playerTrack || !playerTrack.id) {
    return null;
  }
  // Do not pass down specific data required by its children,
  // just pass track down and let the children's  do their job
  return (
    <OuterWrapper>
      <BoxShadow blur={10} spread={4} shade={5}>
        <ContentWrapper>
          <PlayerProgressBar playerTrack={playerTrack} />
          <PlayerAudio playerTrack={playerTrack} />
          <PlayerTrackInfo playerTrack={playerTrack} />
          <PlayerControls />
          <RightSectionWrapper>
            <PlayerTimeSection playerTrack={playerTrack} />
            <PlayerVolumeControls />
            <PlayerModeControls />
          </RightSectionWrapper>
        </ContentWrapper>
      </BoxShadow>
    </OuterWrapper>
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
