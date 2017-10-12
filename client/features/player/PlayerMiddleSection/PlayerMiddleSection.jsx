import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isPlayerPlaying, isPlayerLoading } from 'features/player/playerSelectors';
import * as playerActions from 'features/player/playerActions';
import PlayerButton from 'features/player/shared/PlayerButton';
import ButtonWrapper from './ButtonWrapper';
import Wrapper from './Wrapper';

class PlayerMiddleSection extends Component {
  renderPlayPauseButton = () => {
    const { playing, pauseSong, playSong, playerLoading } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          disabled={playerLoading}
          tooltipText={playing ? 'Pause' : 'Play'}
          iconName={playing ? 'pause' : 'play'}
          onClick={playing ? pauseSong : playSong}
        />
      </ButtonWrapper>
    );
  };

  renderForwardButton = () => {
    const { playNextSong, playerLoading } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Next"
          iconName="step-forward"
          onClick={playNextSong}
          disabled={playerLoading}
        />
      </ButtonWrapper>
    );
  };

  renderBackwardButton = () => {
    const { playPrevSong, playerLoading } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText="Previous"
          iconName="step-backward"
          onClick={playPrevSong}
          disabled={playerLoading}
        />
      </ButtonWrapper>
    );
  };

  render() {
    return (
      <Wrapper>
        {this.renderBackwardButton()}
        {this.renderPlayPauseButton()}
        {this.renderForwardButton()}
      </Wrapper>
    );
  }
}

PlayerMiddleSection.propTypes = {
  playing: PropTypes.bool.isRequired,
  playerLoading: PropTypes.bool.isRequired,
  playNextSong: PropTypes.func.isRequired,
  playPrevSong: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  pauseSong: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    playing: isPlayerPlaying(state),
    playerLoading: isPlayerLoading(state),
  };
}

export default connect(mapStateToProps, playerActions)(PlayerMiddleSection);
