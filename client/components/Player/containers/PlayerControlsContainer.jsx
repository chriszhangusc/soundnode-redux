import { connect } from 'react-redux';
import { isPlayerPlaying } from 'client/redux/modules/reducers';
import {
  playSong,
  pauseSong,
  sagaPlayNextSong,
  sagaPlayPrevSong
} from 'client/redux/modules/player';
import PlayerControls from '../components/PlayerControls';

const mapStateToProps = state => ({
  playing: isPlayerPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  onPlayClick: () => { dispatch(playSong()); },
  onPauseClick: () => { dispatch(pauseSong()); },
  onNextClick: () => { dispatch(sagaPlayNextSong()); },
  onPrevClick: () => { dispatch(sagaPlayPrevSong()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
