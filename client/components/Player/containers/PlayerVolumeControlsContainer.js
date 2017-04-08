import { connect } from 'react-redux';
import { computeNewVolumeOnSeek } from 'client/utils/PlayerUtils';
import {
  beginVolumeSeek,
  changeVolume,
  toggleMute,
  updateVolumeAndEndSeek,
} from 'client/redux/modules/player/actions';
import {
  getCurrentVolume,
  isVolumeSeeking,
} from 'client/redux/modules/player/selectors';
import PlayerVolumeControls from '../components/PlayerVolumeControls';

const mapStateToProps = state => ({
  volume: getCurrentVolume(state),
  volumeSeeking: isVolumeSeeking(state),
});

const mapDispatchToProps = dispatch => ({
  onVolumeHandleMouseDown: () => { dispatch(beginVolumeSeek()); },

  onVolumeHandleMouseMove: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(changeVolume(newVolume));
  },

  onVolumeBarMouseDown: () => { dispatch(beginVolumeSeek()); },

  onToggleMuteClick: () => { dispatch(toggleMute()); },

  onVolumeMouseUp: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(updateVolumeAndEndSeek(newVolume));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
