import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isPlayerPlaying } from 'features/player/playerSelectors';
import * as playerActions from 'features/player/playerActions';
import PlayerButton from '../PlayerButton';
import ButtonWrapper from './ButtonWrapper';
import Wrapper from './Wrapper';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  renderPlayPauseButton() {
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

  renderForwardButton() {
    const { playNextSong } = this.props;
    return (
      <ButtonWrapper>
        <PlayerButton tooltipText="Next" name="step-forward" onClick={playNextSong} />
      </ButtonWrapper>
    );
  }

  renderBackwardButton() {
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

PlayerControls.propTypes = {
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

export default connect(mapStateToProps, playerActions)(PlayerControls);
