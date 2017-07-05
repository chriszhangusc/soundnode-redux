import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isPlayerPlaying } from 'features/player/playerSelectors';
import * as playerActions from 'features/player/playerActions';
import PlayerButton from '../PlayerButton';

const PlayerControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 48px 0 48px;
`;

const ButtonWrapper = styled.div`
  margin: 0 40px;
`;

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
          iconSize="2rem"
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
      <PlayerButton iconSize="2rem" tooltipText="Next" name="step-forward" onClick={playNextSong} />
    );
  }

  renderBackwardButton() {
    const { playPrevSong } = this.props;
    return (
      <PlayerButton
        iconSize="2rem"
        tooltipText="Previous"
        name="step-backward"
        onClick={playPrevSong}
      />
    );
  }

  render() {
    return (
      <PlayerControlsWrapper>
        {this.renderBackwardButton()}
        {this.renderPlayPauseButton()}
        {this.renderForwardButton()}
      </PlayerControlsWrapper>
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
