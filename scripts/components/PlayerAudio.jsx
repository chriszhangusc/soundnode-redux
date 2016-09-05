import React, { PropTypes, Component } from 'react';
// Stateless functional component
class PlayerAudio extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount () {
    const audio = this.audioElement;
    const {onTimeUpdate, onEnded, onPlay, onPause, onDurationChange, onLoadedMetadata} = this.props;
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    audio.addEventListener('loadedmetadata', () => {onLoadedMetadata(audio.duration)});
    audio.addEventListener('play', () => console.log('play!!'));
    audio.addEventListener('pause', () => console.log('pause!!'));
    audio.play();
  }

  componentDidUpdate (prevProps) {
    const {player} = this.props;
    const audioElement = this.audioElement;
    const prevSong = prevProps.player.song;
    const currentSong = player.song;
    const prevSeek = prevProps.player.isSeeking;
    const currentSeek = player.isSeeking;
    const currentTime = player.currentTime;
    // If seeking status changed from true to false, then we should update time in our audioElement
    if (prevSeek && !currentSeek) {
      audioElement.currentTime = currentTime;
    }

    // This is for changing song in main song card.
    if (prevSong.id !== currentSong.id) {
      audioElement.play();
    }

    if (audioElement.paused === player.isPlaying) {
      audioElement.paused ? audioElement.play(): audioElement.pause();
    }

  }

  componentWillUnmount () {
    const audio = this.audioElement;
    const {onTimeUpdate} = this.props;
    audio.removeEventListener('timeupdate', onTimeUpdate);
  }

  render () {
    const {src, audioRef} = this.props;
    return (
      <audio id="audio" preload
        ref={ ref => this.audioElement = ref} src={src} />
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
