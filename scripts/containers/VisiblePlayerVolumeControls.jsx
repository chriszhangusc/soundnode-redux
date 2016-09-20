import { connect } from 'react-redux';
import PlayerVolumeControls from '../components/PlayerVolumeControls';
import { getCurrentVolume, getVolumeSeekState } from '../selectors/playerSelectors';
import { computeNewVolumeOnSeek } from '../utils/PlayerUtils';
import actions from '../actions';


const mapStateToProps = (state) => ({
  volume: getCurrentVolume(state),
  volumeIsSeeking: getVolumeSeekState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onVolumeHandleMouseDown: () => { dispatch(actions.beginVolumeSeek()) },
  onVolumeHandleMouseMove: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(actions.changeVolume(newVolume));
  },
  onVolumeBarMouseDown: () => { dispatch(actions.beginVolumeSeek()) },
  onToggleMuteClick: () => { dispatch(actions.toggleMute()) },
  onVolumeMouseUp: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(actions.updateVolumeAndEndSeek(newVolume));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
