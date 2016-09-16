import { connect } from 'react-redux';
import PlayerControls from '../components/PlayerControls';
import { getPlayingState } from '../selectors/playerSelectors';
import { playSong, pauseSong, playNextSong, playPrevSong } from '../actions/player';

const mapStateToProps = (state) => ({
  isPlaying: getPlayingState(state)
});

const mapDispatchToProps = (dispatch) => ({
  onPlayClick: () => { dispatch(playSong()) },
  onPauseClick: () => { dispatch(pauseSong()) },
  onNextClick: () => { dispatch(playNextSong()) },
  onPrevClick: () => { dispatch(playPrevSong()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls);
