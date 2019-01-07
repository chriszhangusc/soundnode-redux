import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentPlayerTrack } from '@soundnode-redux/client/src/features/player/playerSelectors';
import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import PlayerLeftSection from '@soundnode-redux/client/src/features/player/PlayerLeftSection';
import PlayerMiddleSection from '@soundnode-redux/client/src/features/player/PlayerMiddleSection';
import PlayerRightSection from '@soundnode-redux/client/src/features/player/PlayerRightSection';
import PlayerAudio from '@soundnode-redux/client/src/features/player/PlayerAudio';
import PlayerProgressBar from '@soundnode-redux/client/src/features/player/PlayerProgressBar';
import Wrapper from './Wrapper';
import ContentWrapper from './ContentWrapper';

function Player({ playerTrack }) {
  if (!playerTrack) {
    return null;
  }

  return (
    <Wrapper>
      <BoxShadow blur={10} spread={4} shade={5}>
        <ContentWrapper>
          <PlayerProgressBar playerTrack={playerTrack} />
          <PlayerAudio playerTrack={playerTrack} />
          <PlayerLeftSection playerTrack={playerTrack} />
          <PlayerMiddleSection />
          <PlayerRightSection playerTrack={playerTrack} />
        </ContentWrapper>
      </BoxShadow>
    </Wrapper>
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
