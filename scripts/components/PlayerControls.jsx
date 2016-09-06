import React, {Component, PropTypes} from 'react';

class PlayerControls extends Component {
  constructor (props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }


  renderPlayPauseButton () {
    const {player, onPauseClick, onPlayClick} = this.props;
    const isPlaying = player.isPlaying;
    return (
      <div className="player-button">
        <i
          className={isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}
          onClick={isPlaying ? onPauseClick : onPlayClick}
          />
      </div>
    );
  }

  renderForwardButton () {
    const {onNextClick} = this.props;
    return (
      <div className="player-button" onClick={onNextClick}>
        <i className="icon ion-ios-fastforward" />
      </div>
    );
  }

  renderBackwardButton () {
    const {onPrevClick} = this.props;
    return (
      <div className="player-button" onClick={onPrevClick}>
        <i className="icon ion-ios-rewind" />
      </div>
    );
  }

  render () {
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

};

export default PlayerControls;
