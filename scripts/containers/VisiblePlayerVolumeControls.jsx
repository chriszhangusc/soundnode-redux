import { connect } from 'react-redux';
import PlayerVolumeControls from '../components/PlayerVolumeControls';
import { getCurrentVolume, getVolumeSeekState } from '../selectors/playerSelectors';

import {
  beginVolumeSeek,
  endVolumeSeek,
  updateVolumeOnSeek,
  toggleMute
} from '../actions/player';


const mapStateToProps = (state) => ({
  volume: getCurrentVolume(state),
  volumeIsSeeking: getVolumeSeekState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onVolumeHandleMouseDown: () => { dispatch(beginVolumeSeek()) },
  onVolumeHandleMouseUp: () => { dispatch(endVolumeSeek()) },
  onVolumeHandleMouseMove: (volumeBar, e) => { dispatch(updateVolumeOnSeek(e, volumeBar)) },
  onVolumeBarMouseDown: () => { dispatch(beginVolumeSeek()) },
  onVolumeBarMouseUp: (volumeBar, e) => { dispatch(updateVolumeOnSeek(e, volumeBar)) },
  onToggleMuteClick: () => { dispatch(toggleMute()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeControls);
