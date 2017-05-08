import { connect } from 'react-redux';
import { computeNewVolumeOnSeek } from 'client/common/utils/PlayerUtils';
import {
  beginVolumeSeek,
  changeVolume,
  toggleMute,
  updateVolumeAndEndSeek,
} from 'client/features/player/playerActions';
import {
  getCurrentVolume,
  isVolumeSeeking,
} from 'client/features/player/playerSelectors';
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
