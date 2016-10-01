import { connect } from 'react-redux';
import PlayerVolumeControls from '../components/PlayerVolumeControls';
import { getCurrentVolume, getVolumeSeekState } from '../../../modules/reducers';
import { computeNewVolumeOnSeek } from '../../../utils/PlayerUtils';

import {
  beginVolumeSeek,
  changeVolume,
  sagaToggleMute,
  sagaUpdateVolumeAndEndSeek
} from '../../../modules/player/actions';

const mapStateToProps = state => ({
  volume: getCurrentVolume(state),
  volumeIsSeeking: getVolumeSeekState(state)
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
