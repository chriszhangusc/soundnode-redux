import { connect } from 'react-redux';
import { isPlayerPlaying } from 'client/features/player/playerSelectors';
import {
  playNextSong,
  playPrevSong,
  playSong,
  pauseSong,
} from 'client/features/player/playerActions';

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
