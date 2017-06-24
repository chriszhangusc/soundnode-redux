import { connect } from 'react-redux';
import { isPlayerPlaying } from 'features/player/playerSelectors';
import {
  playNextSong,
  playPrevSong,
  playSong,
  pauseSong,
} from 'features/player/playerActions';

import PlayerControls from './PlayerControls';

function mapStateToProps(state) {
  return {
    playing: isPlayerPlaying(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlayClick: () => {
      dispatch(playSong());
    },
    onPauseClick: () => {
      dispatch(pauseSong());
    },
    onNextClick: () => {
      dispatch(playNextSong());
    },
    onPrevClick: () => {
      dispatch(playPrevSong());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
