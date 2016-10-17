import { connect } from 'react-redux';
import { computeNewTimeOnSeek } from 'client/utils/PlayerUtils';
import {
  getPlayingState,
  getCurrentTime,
  getSeekState
} from 'client/redux/modules/reducers';

import {
  beginSeek,
  sagaUpdateTimeOnSeek,
  sagaUpdateTimeAndEndSeek
} from 'client/redux/modules/player';

import PlayerDurationBar from '../components/PlayerDurationBar';

const mapStateToProps = (state, { track }) => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: track.getDuration(),
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
