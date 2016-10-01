import { connect } from 'react-redux';
import PlayerModeControls from '../components/PlayerModeControls';
import { getPlayerMode } from '../../../modules/reducers';
import { sagaChangePlayMode } from '../../../modules/player/actions';
import { REPEAT, SHUFFLE } from '../../../constants/PlayerConstants';

const mapStateToProps = state => ({
  mode: getPlayerMode(state)
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(sagaChangePlayMode(SHUFFLE)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
