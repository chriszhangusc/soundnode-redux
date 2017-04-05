import { connect } from 'react-redux';
import {
  isPlayerPlaying,
  playSong,
  pauseSong,
  playNextSong,
  playPrevSong,
} from 'client/redux/modules/player';
import PlayerControls from '../components/PlayerControls';

const mapStateToProps = state => ({
  playing: isPlayerPlaying(state),
});

const mapDispatchToProps = dispatch => ({
  onPlayClick: () => { dispatch(playSong()); },
  onPauseClick: () => { dispatch(pauseSong()); },
  onNextClick: () => { dispatch(playNextSong()); },
  onPrevClick: () => { dispatch(playPrevSong()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
