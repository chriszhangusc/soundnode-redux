import { connect } from 'react-redux';
import { computeNewVolumeOnSeek } from 'client/utils/PlayerUtils';
import {
  getCurrentVolume,
  isVolumeSeeking,
  beginVolumeSeek,
  changeVolume,
  sagaToggleMute,
  sagaUpdateVolumeAndEndSeek,
} from 'client/redux/modules/player';
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

  onToggleMuteClick: () => { dispatch(sagaToggleMute()); },

  onVolumeMouseUp: (volumeBar, e) => {
    const newVolume = computeNewVolumeOnSeek(volumeBar, e);
    dispatch(sagaUpdateVolumeAndEndSeek(newVolume));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
