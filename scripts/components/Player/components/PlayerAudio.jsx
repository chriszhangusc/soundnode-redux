import React, { PropTypes, Component } from 'react';
import { REPEAT } from 'client/constants/PlayerConstants';

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
    if (prevProps.isSeeking && !this.props.isSeeking) {
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
    if (audioElement.paused === this.props.isPlaying) {
      if (audioElement.paused) audioElement.play();
      else audioElement.pause();
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
        ref={(ref) => { this.audioElement = ref; }}
        src={streamUrl}
      />
    );
  }
}

PlayerAudio.propTypes = {
  isSeeking: PropTypes.bool,
  currentTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  volume: PropTypes.number,
  mode: PropTypes.string,
  streamUrl: PropTypes.string,
  onTimeUpdate: PropTypes.func,
  onEnded: PropTypes.func
};

export default PlayerAudio;
