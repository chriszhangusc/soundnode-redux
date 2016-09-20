import { connect } from 'react-redux';
import PlayerAudio from '../components/PlayerAudio';

import {
  getPlayingState,
  getStreamUrl,
  getCurrentVolume,
  getPlayerMode,
  getCurrentTime,
  getSeekState
} from '../selectors/playerSelectors';

import { onRegularTimeUpdate, playNextSong, changeDuration } from '../actions/player';

const mapStateToProps = (state) => ({
  isPlaying: getPlayingState(state),
  volume: getCurrentVolume(state),
  mode: getPlayerMode(state),
  streamUrl: getStreamUrl(state),
  currentTime: getCurrentTime(state),
  isSeeking: getSeekState(state)
});

const mapDispatchToProps = (dispatch) => ({
  //Update time in store
  onTimeUpdate: (e) => { dispatch(onRegularTimeUpdate(e.target.currentTime)) },
  onEnded: () => { dispatch(playNextSong()) },
  onLoadedMetadata: (audioElement) => {
    const duration = Math.floor(audioElement.duration);
    dispatch(changeDuration(duration));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
