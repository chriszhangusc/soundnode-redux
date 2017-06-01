import { connect } from 'react-redux';
import { isPlayerPlaying } from 'client/features/player/playerSelectors';
import {
  playNextSong,
  playPrevSong,
  playSong,
  pauseSong,
} from 'client/features/player/playerActions';

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
