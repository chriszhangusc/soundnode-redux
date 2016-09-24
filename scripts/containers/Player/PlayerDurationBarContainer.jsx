import { connect } from 'react-redux';
import PlayerDurationBar from '../../components/Player/PlayerDurationBar';
import { computeNewTimeOnSeek } from '../../utils/PlayerUtils';
import actions from '../../actions';
import {
  getPlayingState,
  getCurrentTime,
  getDuration,
  getSeekState
} from '../../selectors/playerSelectors';

const mapStateToProps = state => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: getDuration(state),
  currentTime: getCurrentTime(state)
});

const mapDispatchToProps = dispatch => ({
  onDurationHandleMouseDown: () => {
    dispatch(actions.beginSeek());
  },
  onDurationHandleMouseMove: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(actions.sagaUpdateTimeOnSeek(newTime));
  },

  onDurationBarMouseDown: () => {
    dispatch(actions.beginSeek());
  },
  // Handle both seekbar handle mouse up and duration bar mouse up
  onMouseUp: (seekBar, duration, e) => {
    const newTime = computeNewTimeOnSeek(seekBar, duration, e);
    dispatch(actions.sagaUpdateTimeAndEndSeek(newTime));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);
