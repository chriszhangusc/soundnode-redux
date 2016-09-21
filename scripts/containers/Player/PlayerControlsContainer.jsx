import { connect } from 'react-redux';
import PlayerControls from '../../components/Player/PlayerControls';
import { getPlayingState } from '../../selectors/playerSelectors';
import actions from '../../actions';

const mapStateToProps = state => ({
  isPlaying: getPlayingState(state)
});

const mapDispatchToProps = dispatch => ({
  onPlayClick: () => { dispatch(actions.playSong()); },
  onPauseClick: () => { dispatch(actions.pauseSong()); },
  onNextClick: () => { dispatch(actions.playNextSong()); },
  onPrevClick: () => { dispatch(actions.playPrevSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
