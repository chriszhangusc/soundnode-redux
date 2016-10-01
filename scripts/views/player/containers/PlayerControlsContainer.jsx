import { connect } from 'react-redux';
import PlayerControls from '../components/PlayerControls';
import { getPlayingState } from '../../../selectors/playerSelectors';
import {
  playSong,
  pauseSong,
  sagaPlayNextSong,
  sagaPlayPrevSong
} from '../../../modules/player/actions';

const mapStateToProps = state => ({
  isPlaying: getPlayingState(state)
});

const mapDispatchToProps = dispatch => ({
  onPlayClick: () => { dispatch(playSong()); },
  onPauseClick: () => { dispatch(pauseSong()); },
  onNextClick: () => { dispatch(sagaPlayNextSong()); },
  onPrevClick: () => { dispatch(sagaPlayPrevSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
