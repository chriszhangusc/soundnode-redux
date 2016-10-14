import { connect } from 'react-redux';
import { formatStreamUrl } from 'client/utils/FormatUtils';
// Selectors
import {
  getPlayingState,
  getCurrentVolume,
  getPlayerMode,
  getCurrentTime,
  getSeekState
} from 'client/modules/reducers';
// Actions
import {
  sagaUpdateTimeOnPlay,
  sagaPlayNextSong,
} from 'client/modules/player/actions';
import PlayerAudio from '../components/PlayerAudio';

const mapStateToProps = (state, { track }) => {
  return {
    isPlaying: getPlayingState(state),
    volume: getCurrentVolume(state),
    mode: getPlayerMode(state),
    streamUrl: formatStreamUrl(track.getStreamUrl(state)),
    currentTime: getCurrentTime(state),
    isSeeking: getSeekState(state)
  };
};

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(sagaUpdateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(sagaPlayNextSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
