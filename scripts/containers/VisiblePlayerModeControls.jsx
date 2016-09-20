import { connect } from 'react-redux';
import PlayerModeControls from '../components/PlayerModeControls';
import { getPlayerMode } from '../selectors/playerSelectors';
import actions from '../actions';
import { REPEAT, SHUFFLE } from '../constants/PlayerConstants';

const mapStateToProps = (state) => ({
  mode: getPlayerMode(state)
});

const mapDispatchToProps = (dispatch) => ({
  onRepeatClick: () => { dispatch(actions.changePlayMode(REPEAT)) },
  onShuffleClick: () => { dispatch(actions.changePlayMode(SHUFFLE)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
