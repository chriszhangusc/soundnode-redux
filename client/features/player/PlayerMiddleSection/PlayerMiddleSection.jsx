import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isPlayerPlaying } from 'features/player/playerSelectors';
import * as playerActions from 'features/player/playerActions';
import PlayerButton from 'features/player/shared/PlayerButton';
import ButtonWrapper from './ButtonWrapper';
import Wrapper from './Wrapper';

class PlayerMiddleSection extends Component {

  renderPlayPauseButton = () => {
    const { playing, pauseSong, playSong } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton
          tooltipText={playing ? 'Pause' : 'Play'}
          name={playing ? 'pause' : 'play'}
          onClick={playing ? pauseSong : playSong}
        />
      </ButtonWrapper>
    );
  }

  renderForwardButton = () => {
    const { playNextSong } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton tooltipText="Next" name="step-forward" onClick={playNextSong} />
      </ButtonWrapper>
    );
  }

  renderBackwardButton = () => {
    const { playPrevSong } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton tooltipText="Previous" name="step-backward" onClick={playPrevSong} />
      </ButtonWrapper>
    );
  }

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
  playNextSong: PropTypes.func.isRequired,
  playPrevSong: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  pauseSong: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    playing: isPlayerPlaying(state),
  };
}

export default connect(mapStateToProps, playerActions)(PlayerMiddleSection);
