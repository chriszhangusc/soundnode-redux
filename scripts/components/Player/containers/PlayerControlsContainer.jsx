import { connect } from 'react-redux';
import { getPlayingState } from 'client/modules/reducers';
import {
  playSong,
  pauseSong,
  sagaPlayNextSong,
  sagaPlayPrevSong
} from 'client/modules/player/actions';
import PlayerControls from '../components/PlayerControls';

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