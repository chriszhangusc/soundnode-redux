import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils'

class PlayerVolumeControls extends Component {
  constructor(props) {
    super(props);
    this.renderVolumeIcon = this.renderVolumeIcon.bind(this);
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevSeeking = prevProps.volumeSeeking;
    const currSeeking = this.props.volumeSeeking;
    if (!prevSeeking && currSeeking) {
      // Listen to event only when we start seeking
      document.addEventListener('mousemove', this.handleVolumeMouseMove);
      document.addEventListener('mouseup', this.handleVolumeMouseUp);
    } else if (prevSeeking && !currSeeking) {
      // Remove them only when we finish seeking
      document.removeEventListener('mousemove', this.handleVolumeMouseMove);
      document.removeEventListener('mouseup', this.handleVolumeMouseUp);
    }
  }

  handleVolumeMouseMove(e) {
    this.props.onVolumeHandleMouseMove(this.volumeBar, e);
  }

  handleVolumeMouseUp(e) {
    this.props.onVolumeMouseUp(this.volumeBar, e);
  }

  renderVolumeIcon() {
    const { volume, onToggleMuteClick } = this.props;
    // Render different icon depending on current volume.
    let icon = null;
    if (volume <= 0) {
      icon = 'ion-volume-mute';
    } else if (volume > 0 && volume < 0.3) {
      icon = 'ion-volume-low';
    } else if (volume >= 0.3 && volume < 0.7) {
      icon = 'ion-volume-medium';
    } else {
      icon = 'ion-volume-high';
    }
    return (
      <button
        title="Mute"
        className="icon-button"
        onClick={onToggleMuteClick}
      >
        <i className={`icon ${icon}`} />
      </button>
    );
  }

  render() {
    const { volume, onVolumeBarMouseDown, onVolumeHandleMouseDown } = this.props;

    return (
      <div className="player-section">
        <div className="player-button player-volume-button" >
          <div className="player-volume-button-wrap">
            {this.renderVolumeIcon()}
          </div>
        </div>
        <div className="player-volume">
          <div
            className="player-seek-bar-wrap"
            onMouseDown={onVolumeBarMouseDown}
            onMouseUp={this.handleVolumeMouseUp}
          >
            <div className="player-seek-bar" ref={(ref) => { this.volumeBar = ref; }}>
              <div className="player-seek-duration-bar" style={{ width: `${volume * 100}%` }} >
                <div className="player-seek-handle" onMouseDown={onVolumeHandleMouseDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



PlayerVolumeControls.defaultProps = {
  volume: 0.5,
  volumeSeeking: false,
  onVolumeBarMouseDown: defaultEventHandlerFactory('onVolumeBarMouseDown'),
  onVolumeHandleMouseDown: defaultEventHandlerFactory('onVolumeHandleMouseDown'),
  onVolumeMouseUp: defaultEventHandlerFactory('onVolumeMouseUp'),
  onToggleMuteClick: defaultEventHandlerFactory('onToggleMuteClick'),
  onVolumeHandleMouseMove: defaultEventHandlerFactory('onVolumeHandleMouseMove'),
};

PlayerVolumeControls.propTypes = {
  volume: PropTypes.number,
  volumeSeeking: PropTypes.bool,
  onVolumeBarMouseDown: PropTypes.func,
  onVolumeHandleMouseDown: PropTypes.func,
  onVolumeMouseUp: PropTypes.func,
  onToggleMuteClick: PropTypes.func,
  onVolumeHandleMouseMove: PropTypes.func,
};

export default PlayerVolumeControls;
