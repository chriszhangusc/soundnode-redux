import React, {Component, PropTypes} from 'react';

class PlayerControls extends Component {
  constructor (props) {
    super(props);
    this.renderPlayPauseButton = this.renderPlayPauseButton.bind(this);
    this.renderForwardButton = this.renderForwardButton.bind(this);
    this.renderBackwardButton = this.renderBackwardButton.bind(this);
  }


  renderPlayPauseButton () {
    const {isPlaying, onPauseClick, onPlayClick} = this.props;
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
    const {playNextSong} = this.props;
    return (
      <div className="player-button" onClick={playNextSong}>
        <i className="icon ion-ios-fastforward" />
      </div>
    );
  }

  renderBackwardButton () {
    const {playPrevSong} = this.props;
    return (
      <div className="player-button" onClick={playPrevSong}>
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

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  playNextSong: PropTypes.func.isRequired,
  playPrevSong: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  // currentSong: PropTypes.object.isRequired,
};

PlayerControls.propTypes = propTypes;

export default PlayerControls;
