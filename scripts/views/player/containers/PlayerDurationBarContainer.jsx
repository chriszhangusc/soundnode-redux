import { connect } from 'react-redux';
import PlayerDurationBar from '../components/PlayerDurationBar';
import { computeNewTimeOnSeek } from '../../../utils/PlayerUtils';
import {
  getPlayingState,
  getCurrentTime,
  getDuration,
  getSeekState
} from '../../../modules/reducers';

import {
  beginSeek,
  sagaUpdateTimeOnSeek,
  sagaUpdateTimeAndEndSeek
} from '../../../modules/player/actions';

const mapStateToProps = state => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: getDuration(state),
  currentTime: getCurrentTime(state)
});

const mapDispatchToProps = dispatch => ({
  onDurationHandleMouseDown: () => {
    dispatch(beginSeek());
  },
  onDurationHandleMouseMove: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(sagaUpdateTimeOnSeek(newTime));
  },

  onDurationBarMouseDown: () => {
    dispatch(beginSeek());
  },
  // Handle both seekbar handle mouse up and duration bar mouse up
  onMouseUp: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(sagaUpdateTimeAndEndSeek(newTime));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);
