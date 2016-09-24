import { connect } from 'react-redux';
import PlayerModeControls from '../../components/Player/PlayerModeControls';
import { getPlayerMode } from '../../selectors/playerSelectors';
import actions from '../../actions';
import { REPEAT, SHUFFLE } from '../../constants/PlayerConstants';

const mapStateToProps = state => ({
  mode: getPlayerMode(state)
});

const mapDispatchToProps = dispatch => ({
  onRepeatClick: () => { dispatch(actions.sagaChangePlayMode(REPEAT)); },
  onShuffleClick: () => { dispatch(actions.sagaChangePlayMode(SHUFFLE)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
