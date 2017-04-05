import React, { Component, PropTypes } from 'react';
import MagicButton from 'client/components/MagicButton';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  renderPlayPauseButton() {
    const { playing, onPauseClick, onPlayClick } = this.props;
    return (<MagicButton
      title="Play"
      btnClassName="icon-button player-button"
      iconClassName={playing ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
      onClick={playing ? onPauseClick : onPlayClick}
    />);
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    return (
      <MagicButton
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
      <MagicButton
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

PlayerControls.propTypes = {
  playing: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
};

export default PlayerControls;
