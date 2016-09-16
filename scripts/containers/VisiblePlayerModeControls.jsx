import { connect } from 'react-redux';
import PlayerModeControls from '../components/PlayerModeControls';
import { getPlayerMode } from '../selectors/playerSelectors';
import { changePlayMode } from '../actions/player';
import { REPEAT, SHUFFLE } from '../constants/PlayerConstants';

const mapStateToProps = (state) => ({
  mode: getPlayerMode(state)
});

const mapDispatchToProps = (dispatch) => ({
  onRepeatClick: () => { dispatch(changePlayMode(REPEAT)) },
  onShuffleClick: () => { dispatch(changePlayMode(SHUFFLE)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModeControls);
