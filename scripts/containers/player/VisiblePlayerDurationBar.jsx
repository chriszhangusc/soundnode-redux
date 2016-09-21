import { connect } from 'react-redux';
import PlayerDurationBar from '../../components/player/PlayerDurationBar';
import { computeNewTimeOnSeek } from '../../utils/PlayerUtils';
import actions from '../../actions';
import {
  getPlayingState,
  getCurrentTime,
  getDuration,
  getSeekState
} from '../../selectors/playerSelectors';

const mapStateToProps = (state) => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: getDuration(state),
  currentTime: getCurrentTime(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onDurationHandleMouseDown: () => {
      dispatch(actions.beginSeek())
    },
    onDurationHandleMouseMove: (seekBar, duration, e) => {
      let newTime = computeNewTimeOnSeek(seekBar, duration, e);
      dispatch(actions.onSeekTimeUpdate(newTime));
    },

    onDurationBarMouseDown: () => {
      dispatch(actions.beginSeek())
    },
    // Handle both seekbar handle mouse up and duration bar mouse up
    onMouseUp: (seekBar, duration, e) => {
      let newTime = computeNewTimeOnSeek(seekBar, duration, e);
      dispatch(actions.updateTimeAndEndSeek(newTime));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);
