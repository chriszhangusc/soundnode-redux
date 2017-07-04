import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayerButton from '../PlayerButton';

const PlayerControlsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  renderPlayPauseButton() {
    const { playing, onPauseClick, onPlayClick } = this.props;
    return (
      <PlayerButton
        tooltipText={playing ? 'Pause' : 'Play'}
        name={playing ? 'pause' : 'play'}
        onClick={playing ? onPauseClick : onPlayClick}
      />
    );
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    return <PlayerButton tooltipText="Next" name="step-forward" onClick={onNextClick} />;
  }

  renderBackwardButton() {
    const { onPrevClick } = this.props;
    return <PlayerButton tooltipText="Previous" name="step-backward" onClick={onPrevClick} />;
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
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

export default PlayerControls;
