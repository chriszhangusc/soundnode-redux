import { connect } from 'react-redux';
import PlayerDurationBar from '../components/PlayerDurationBar';
import { computeNewTimeOnSeek } from '../utils/PlayerUtils';
import { beginSeek, endSeek, onSeekTimeUpdate, updateTimeAndEndSeek } from '../actions/player';
import {
  getPlayingState,
  getCurrentTime,
  getDuration,
  getSeekState
} from '../selectors/playerSelectors';

const mapStateToProps = (state) => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: getDuration(state),
  currentTime: getCurrentTime(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDurationHandleMouseDown: () => {
      dispatch(beginSeek())
    },
    onDurationHandleMouseMove: (seekBar, duration, e) => {
      let newTime = computeNewTimeOnSeek(seekBar, duration, e);
      dispatch(onSeekTimeUpdate(newTime));
    },

    onDurationBarMouseDown: () => {
      dispatch(beginSeek())
    },
    // Handle both seekbar handle mouse up and duration bar mouse up
    onMouseUp: (seekBar, duration, e) => {
      let newTime = computeNewTimeOnSeek(seekBar, duration, e);
      dispatch(updateTimeAndEndSeek(newTime));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);
