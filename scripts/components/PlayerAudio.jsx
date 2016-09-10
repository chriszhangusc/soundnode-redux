import React, { PropTypes, Component } from 'react';
import {REPEAT} from '../constants/PlayerConstants';
// Stateless functional component
class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.bindEventListeners = this.bindEventListeners.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
    this.updateTimeIfNeeded = this.updateTimeIfNeeded.bind(this);
    this.togglePlayIfNeeded = this.togglePlayIfNeeded.bind(this);
    this.updateVolumeIfNeeded = this.updateVolumeIfNeeded.bind(this);
  }

  componentDidMount () {
    this.bindEventListeners();
    this.togglePlayIfNeeded(this.audioElement, this.props.player.isPlaying);
  }

  componentWillUnmount () {
    this.removeEventListeners();
  }

  componentDidUpdate (prevProps) {
    this.updateTimeIfNeeded(prevProps, this.props);
    this.updateVolumeIfNeeded(prevProps, this.props);
    this.togglePlayIfNeeded(this.audioElement, this.props.player.isPlaying);
  }

  // If seeking status changed from true to false, then we should update time in our audioElement
  updateTimeIfNeeded(prevProps, currProps) {
    if (prevProps.player.isSeeking && !currProps.player.isSeeking) {
      this.audioElement.currentTime = currProps.player.currentTime;
    }
  }

  updateVolumeIfNeeded(prevProps, currProps) {
    if (prevProps.player.volume !== this.props.player.volume) {
      this.audioElement.volume = currProps.player.volume;
    }
  }

  togglePlayIfNeeded(audioElement, isPlaying) {
    // This also covers change song and play logic
    if (audioElement.paused === isPlaying) {
      audioElement.paused ? audioElement.play(): audioElement.pause();
    }
  }

  bindEventListeners () {
    const audio = this.audioElement;
    const {onTimeUpdate, onEnded, onLoadedMetadata} = this.props;
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata.bind(null, audio));
  }

  removeEventListeners () {
    const audio = this.audioElement;
    const {onTimeUpdate, onEnded, onLoadedMetadata} = this.props;
    audio.removeEventListener('timeupdate', onTimeUpdate);
    audio.removeEventListener('ended', onEnded);
    audio.removeEventListener('loadedmetadata', onLoadedMetadata);
  }



  render () {
    const {src, player} = this.props;

    return (
      <audio id="audio"
        loop={player.mode === REPEAT ? true : false}
        ref={ ref => this.audioElement = ref}
        src={src} />
    );
  }

}

PlayerAudio.PropTypes = {
  src: PropTypes.string.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
};

export default PlayerAudio;
