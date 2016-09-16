import { connect } from 'react-redux';
import PlayerDurationBar from '../components/PlayerDurationBar';
import { getPlayingState, getCurrentTime, getDuration, getSeekState } from '../selectors/playerSelectors';
import { beginSeek, endSeek, updateTimeOnSeek, updateTimeAndEndSeeking } from '../actions/player';

const mapStateToProps = (state) => ({
  isSeeking: getSeekState(state),
  isPlaying: getPlayingState(state),
  duration: getDuration(state),
  currentTime: getCurrentTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  onDurationHandleMouseDown: () => {
    dispatch(beginSeek())
  },
  onDurationHandleMouseMove: (seekBar, duration, e) => {
    dispatch(updateTimeOnSeek(seekBar, duration, e))
  },
  onDurationHandleMouseUp: () => {
    dispatch(endSeek())
  },
  onDurationBarMouseDown: () => {
    dispatch(beginSeek())
  },
  onDurationBarMouseUp: (seekBar, duration, e) => {
    dispatch(updateTimeAndEndSeeking(seekBar, duration, e))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDurationBar);
