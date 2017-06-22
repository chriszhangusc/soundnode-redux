import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
    const tooltip = <Tooltip id="tooltip-play-pause">{playing ? 'Pause' : 'Play'}</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton
          title={playing ? 'Play' : 'Pause'}
          iconClassName={playing ? 'ion-ios-pause' : 'ion-ios-play'}
          onClick={playing ? onPauseClick : onPlayClick}
        />
      </OverlayTrigger>
    );
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    const tooltip = <Tooltip id="tooltip-next">Next</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton title="Next" iconClassName="ion-ios-fastforward" onClick={onNextClick} />
      </OverlayTrigger>
    );
  }

  renderBackwardButton() {
    const { onPrevClick } = this.props;
    const tooltip = <Tooltip id="tooltip-previous">Previous</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <PlayerButton title="Previous" iconClassName="ion-ios-rewind" onClick={onPrevClick} />
      </OverlayTrigger>
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
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
};

export default PlayerControls;
