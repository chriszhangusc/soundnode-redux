import React, { PropTypes, Component } from 'react';
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
    const audio = this.audioElement;
    audio.play();
  }

  componentWillUnmount () {
    this.removeEventListeners();
  }

  // Needs to be rewritten!
  componentDidUpdate (prevProps) {
    this.updateTimeIfNeeded(prevProps, this.props);
    this.updateVolumeIfNeeded(prevProps, this.props);
    this.togglePlayIfNeeded(prevProps, this.props);
  }

  // If seeking status changed from true to false, then we should update time in our audioElement
  updateTimeIfNeeded(prevProps, currProps) {
    if (prevProps.player.isSeeking && !currProps.player.isSeeking) this.audioElement.currentTime = currProps.player.currentTime;
  }

  updateVolumeIfNeeded(prevProps, currProps) {
    if (prevProps.player.volumeIsSeeking && !currProps.player.volumeIsSeeking || prevProps.player.volume !== this.props.player.volume) {
      this.audioElement.volume = currProps.player.volume;
    }
  }

  togglePlayIfNeeded(prevProps, currProps) {
    if (prevProps.player.song.id !== currProps.player.song.id) {
      this.audioElement.play();
    }
    if (this.audioElement.paused === currProps.player.isPlaying) {
      this.audioElement.paused ? this.audioElement.play(): this.audioElement.pause();
    }
  }

  bindEventListeners () {
    const audio = this.audioElement;
    const {onTimeUpdate, onEnded, onLoadedMetadata} = this.props;
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', onLoadedMetadata.bind(audio));
  }

  removeEventListeners () {
    const audio = this.audioElement;
    const {onTimeUpdate, onEnded, onLoadedMetadata} = this.props;
    audio.removeEventListener('timeupdate', onTimeUpdate);
    audio.removeEventListener('ended', onEnded);
    audio.removeEventListener('loadedmetadata', onLoadedMetadata);
  }



  render () {
    const {src} = this.props;
    return (
      <audio id="audio"
        preload
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
