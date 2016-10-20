import { connect } from 'react-redux';
import { formatStreamUrl } from 'client/utils/FormatUtils';
// Selectors
import {
  getCurrentTime,
  getCurrentVolume,
  getPlayerMode,
  isPlayerPlaying,
  isPlayerSeeking
} from 'client/redux/modules/reducers';
// Actions
import {
  sagaUpdateTimeOnPlay,
  sagaPlayNextSong,
} from 'client/redux/modules/player';
import PlayerAudio from '../components/PlayerAudio';

const mapStateToProps = (state, { playerTrack }) => ({
  playing: isPlayerPlaying(state),
  volume: getCurrentVolume(state),
  mode: getPlayerMode(state),
  streamUrl: formatStreamUrl(playerTrack.getStreamUrl()),
  currentTime: getCurrentTime(state),
  seeking: isPlayerSeeking(state)
});

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(sagaUpdateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(sagaPlayNextSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
