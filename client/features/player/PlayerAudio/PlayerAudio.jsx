import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REPEAT } from 'features/player/playerConsts';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.bindEventListeners = this.bindEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.updateTimeIfNeeded = this.updateTimeIfNeeded.bind(this);
    this.togglePlayIfNeeded = this.togglePlayIfNeeded.bind(this);
    this.updateVolumeIfNeeded = this.updateVolumeIfNeeded.bind(this);
  }

  componentDidMount() {
    this.bindEventListeners();
    this.togglePlayIfNeeded(this.audioElement, this.props);
  }

  componentDidUpdate(prevProps) {
    this.updateTimeIfNeeded(prevProps);
    this.updateVolumeIfNeeded(prevProps);
    this.togglePlayIfNeeded(this.audioElement);
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  // If seeking status changed from true to false, then we should update time in our audioElement
  updateTimeIfNeeded(prevProps) {
    if (prevProps.seeking && !this.props.seeking) {
      this.audioElement.currentTime = this.props.currentTime;
    }
    // Reason: In case of repeat mode, when user click next/prev song button,
    // we will update currentTime to 0, so we need to force update the actual
    // time of our player.
    if (prevProps.currentTime !== 0 && this.props.currentTime === 0) {
      this.audioElement.currentTime = this.props.currentTime;
    }
  }

  updateVolumeIfNeeded(prevProps) {
    if (prevProps.volume !== this.props.volume) {
      this.audioElement.volume = this.props.volume;
    }
  }

  togglePlayIfNeeded(audioElement) {
    // This also covers change song and play logic
    if (audioElement.paused === this.props.playing) {
      if (audioElement.paused) {
        audioElement.play().then(() => {
          console.log();
        });
      } else {
        audioElement.pause();
      }
    }
  }

  bindEventListeners() {
    const audio = this.audioElement;
    const { onTimeUpdate, onEnded } = this.props;
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
  }

  removeEventListeners() {
    const audio = this.audioElement;
    const { onTimeUpdate, onEnded } = this.props;
    audio.removeEventListener('timeupdate', onTimeUpdate);
    audio.removeEventListener('ended', onEnded);
  }

  render() {
    const { streamUrl, mode } = this.props;
    return (
      <audio
        id="audio"
        loop={mode === REPEAT}
        ref={(ref) => {
          this.audioElement = ref;
        }}
        src={streamUrl}
      />
    );
  }
}

// PlayerAudio.defaultProps = {
//   seeking: false,
//   currentTime: 0.0,
//   playing: false,
//   volume: 0.5,
//   mode: 'LOOP',
//   streamUrl: '',
// };

PlayerAudio.propTypes = {
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  streamUrl: PropTypes.string.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
};

export default PlayerAudio;
