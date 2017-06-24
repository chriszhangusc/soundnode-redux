import { connect } from 'react-redux';
import { getStreamUrl } from 'common/utils/apiUtils';
import { updateTimeOnPlay, playNextSong } from 'features/player/playerActions';

import {
  getCurrentTime,
  getCurrentVolume,
  getPlayerMode,
  isPlayerPlaying,
  isPlayerSeeking,
} from 'features/player/playerSelectors';

import PlayerAudio from './PlayerAudio';

function mapStateToProps(state, { playerTrack }) {
  return {
    playing: isPlayerPlaying(state),
    volume: getCurrentVolume(state),
    mode: getPlayerMode(state),
    streamUrl: getStreamUrl(playerTrack),
    currentTime: getCurrentTime(state),
    seeking: isPlayerSeeking(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Update time in store
    onTimeUpdate: (e) => {
      dispatch(updateTimeOnPlay(e.target.currentTime));
    },
    onEnded: () => {
      dispatch(playNextSong());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
