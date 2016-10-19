
import { connect } from 'react-redux';
// Selectors
import {
  isPlayerPlaying,
  getCurrentVolume,
  getPlayerMode,
  getCurrentTime,
  isPlayerSeeking
} from 'client/redux/modules/reducers';
// Actions
import {
  sagaUpdateTimeOnPlay,
  sagaPlayNextSong,
} from 'client/redux/modules/player';
import PlayerAudio from '../components/PlayerAudio';

const mapStateToProps = (state, { streamUrl }) => {
  return {
    playing: isPlayerPlaying(state),
    volume: getCurrentVolume(state),
    mode: getPlayerMode(state),
    streamUrl,
    currentTime: getCurrentTime(state),
    seeking: isPlayerSeeking(state)
  };
};

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(sagaUpdateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(sagaPlayNextSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
