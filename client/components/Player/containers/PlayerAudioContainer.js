import { connect } from 'react-redux';
import { formatStreamUrl } from 'client/utils/FormatUtils';
import {
  updateTimeOnPlay,
  playNextSong,
} from 'client/redux/modules/player/actions';

import {
  getCurrentTime,
  getCurrentVolume,
  getPlayerMode,
  isPlayerPlaying,
  isPlayerSeeking,
} from 'client/redux/modules/player/selectors';

import PlayerAudio from '../components/PlayerAudio';

const mapStateToProps = (state, { playerTrack }) => ({
  playing: isPlayerPlaying(state),
  volume: getCurrentVolume(state),
  mode: getPlayerMode(state),
  streamUrl: formatStreamUrl(playerTrack.streamUrl), // Append client_id!!
  currentTime: getCurrentTime(state),
  seeking: isPlayerSeeking(state),
});

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(updateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(playNextSong()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
