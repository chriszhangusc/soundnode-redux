import { connect } from 'react-redux';
import { formatStreamUrl } from 'client/common/utils/formatUtils';
import { updateTimeOnPlay, playNextSong } from 'client/features/player/playerActions';

import {
  getCurrentTime,
  getCurrentVolume,
  getPlayerMode,
  isPlayerPlaying,
  isPlayerSeeking,
} from 'client/features/player/playerSelectors';

import PlayerAudio from './PlayerAudio';

const mapStateToProps = (state, { playerTrack }) => ({
  playing: isPlayerPlaying(state),
  volume: getCurrentVolume(state),
  mode: getPlayerMode(state),
  streamUrl: formatStreamUrl(playerTrack.streamUrl),
  currentTime: getCurrentTime(state),
  seeking: isPlayerSeeking(state),
});

const mapDispatchToProps = dispatch => ({
  // Update time in store
  onTimeUpdate: (e) => { dispatch(updateTimeOnPlay(e.target.currentTime)); },
  onEnded: () => { dispatch(playNextSong()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
