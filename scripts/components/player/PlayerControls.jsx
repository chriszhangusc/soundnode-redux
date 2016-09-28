import React, { Component, PropTypes } from 'react';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }

  renderPlayPauseButton() {
    const { isPlaying, onPauseClick, onPlayClick } = this.props;
    return (
      <button className="icon-button player-button" onClick={isPlaying ? onPauseClick : onPlayClick}>
        <i className={isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'} />
      </button>
    );
  }

  renderForwardButton() {
    const { onNextClick } = this.props;
    return (
      <button className="icon-button player-button" onClick={onNextClick}>
        <i className="icon ion-ios-fastforward" />
      </button>
    );
  }

  renderBackwardButton() {
    const { onPrevClick } = this.props;
    return (
      <button className="icon-button player-button" onClick={onPrevClick}>
        <i className="icon ion-ios-rewind" />
      </button>
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
  isPlaying: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func
};

export default PlayerControls;
