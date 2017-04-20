import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
// import FontAwesomeButton from 'client/components/Buttons/FontAwesomeButton';
import IconButton from 'client/components/Buttons/IconButton';

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
      <IconButton
        title="Play"
        btnClassName="icon-button player-button"
        iconClassName={playing ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
        onClick={playing ? onPauseClick : onPlayClick}
      />
    );
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    return (
      <IconButton
        title="Next"
        btnClassName="icon-button player-button"
        iconClassName="icon ion-ios-fastforward"
        onClick={onNextClick}
      />
    );
  }

  renderBackwardButton() {
    const { onPrevClick } = this.props;
    return (
      <IconButton
        title="Previous"
        btnClassName="icon-button player-button"
        iconClassName="icon ion-ios-rewind"
        onClick={onPrevClick}
      />
    );
  }

  render() {
    return (
      <div className="player-section">
        {this.renderBackwardButton()}
        {this.renderPlayPauseButton()}
        {this.renderForwardButton()}
      </div>
    );
  }
}

PlayerControls.defaultProps = {
  playing: false,
  onNextClick: defaultEventHandlerFactory('onNextClick'),
  onPrevClick: defaultEventHandlerFactory('onPrevClick'),
  onPlayClick: defaultEventHandlerFactory('onPlayClick'),
  onPauseClick: defaultEventHandlerFactory('onPauseClick'),
};

PlayerControls.propTypes = {
  playing: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
};

export default PlayerControls;
