import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from 'features/player/playerSelectors';
import BoxShadow from 'common/components/BoxShadow';
import PlayerLeftSection from 'features/player/PlayerLeftSection';
import PlayerMiddleSection from 'features/player/PlayerMiddleSection';
import PlayerRightSection from 'features/player/PlayerRightSection';
import PlayerAudio from 'features/player/PlayerAudio';
import PlayerProgressBar from 'features/player/PlayerProgressBar';
import OuterWrapper from './OuterWrapper';
import ContentWrapper from './ContentWrapper';

function Player({ playerTrack }) {
  if (!playerTrack) {
    return null;
  }

  return (
    <OuterWrapper>
      <BoxShadow blur={10} spread={4} shade={5}>
        <ContentWrapper>
          <PlayerProgressBar playerTrack={playerTrack} />
          <PlayerAudio playerTrack={playerTrack} />
          <PlayerLeftSection playerTrack={playerTrack} />
          <PlayerMiddleSection />
          <PlayerRightSection playerTrack={playerTrack} />
        </ContentWrapper>
      </BoxShadow>
    </OuterWrapper>
  );
}

Player.defaultProps = {
  playerTrack: null,
};

Player.propTypes = {
  playerTrack: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    playerTrack: getCurrentPlayerTrack(state),
  };
}

export default connect(mapStateToProps)(Player);
