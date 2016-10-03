import { connect } from 'react-redux';
import PlayerModeControls from '../components/PlayerModeControls';
import { getPlayerMode, getShowPlaylist } from '../../../modules/reducers';
import { sagaChangePlayMode, togglePlaylist } from '../../../modules/player/actions';
import { REPEAT, SHUFFLE } from '../../../constants/PlayerConstants';

const mapStateToProps = state => ({
  mode: getPlayerMode(state),
  isPlaylistShown: getShowPlaylist(state)
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(sagaChangePlayMode(SHUFFLE)); },
  onTogglePlaylistClick: () => { dispatch(togglePlaylist()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
