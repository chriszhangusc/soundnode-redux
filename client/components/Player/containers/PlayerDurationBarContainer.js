import { connect } from 'react-redux';
import { computeNewTimeOnSeek } from 'client/utils/PlayerUtils';
import {
  getCurrentTime,
  isPlayerSeeking
} from 'client/redux/modules/reducers';

import {
  beginSeek,
  sagaUpdateTimeOnSeek,
  sagaUpdateTimeAndEndSeek
} from 'client/redux/modules/player';

import PlayerDurationBar from '../components/PlayerDurationBar';

const mapStateToProps = (state, { playerTrack }) => ({
  seeking: isPlayerSeeking(state),
  currentTime: getCurrentTime(state),
  duration: playerTrack.getDuration()
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
