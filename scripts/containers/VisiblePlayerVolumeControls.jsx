import { connect } from 'react-redux';
import PlayerVolumeControls from '../components/PlayerVolumeControls';
import { getCurrentVolume, getVolumeSeekState } from '../selectors/playerSelectors';
import { computeNewVolumeOnSeek } from '../utils/PlayerUtils';
import {
  beginVolumeSeek,
  updateVolumeAndEndSeek,
  changeVolume,
  toggleMute
} from '../actions/player';


const mapStateToProps = (state) => ({
  volume: getCurrentVolume(state),
  volumeIsSeeking: getVolumeSeekState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onVolumeHandleMouseDown: () => { dispatch(beginVolumeSeek()) },
  onVolumeHandleMouseMove: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(changeVolume(newVolume));
  },
  onVolumeBarMouseDown: () => { dispatch(beginVolumeSeek()) },
  onToggleMuteClick: () => { dispatch(toggleMute()) },
  onVolumeMouseUp: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(updateVolumeAndEndSeek(newVolume));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
