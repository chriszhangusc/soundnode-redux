import { connect } from 'react-redux';
import PlayerAudio from '../components/PlayerAudio';
// Selectors
import {
  getPlayingState,
  getCurrentVolume,
  getPlayerMode,
  getStreamUrl,
  getCurrentTime,
  getSeekState
} from '../../../modules/reducers';
// Actions
import {
  sagaUpdateTimeOnPlay,
  sagaPlayNextSong,
  changeDuration
} from '../../../modules/player/actions';

const mapStateToProps = state => ({
  isPlaying: getPlayingState(state),
  volume: getCurrentVolume(state),
  mode: getPlayerMode(state),
  streamUrl: getStreamUrl(state),
  currentTime: getCurrentTime(state),
  isSeeking: getSeekState(state)
});

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(sagaUpdateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(sagaPlayNextSong()); },
  onLoadedMetadata: (audioElement) => {
    const duration = Math.floor(audioElement.duration);
    dispatch(changeDuration(duration));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
