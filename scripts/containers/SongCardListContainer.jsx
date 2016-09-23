import { connect } from 'react-redux';
import actions from '../actions';
import SongCardList from '../components/SongCardList';
import { getVisibleFetchState } from '../reducers';
import { getVisibleSongsAsArray } from '../selectors/songCardListSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: getVisibleFetchState(state),
  songs: getVisibleSongsAsArray(state) // may break on search
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() { dispatch(actions.loadMoreSongsOnScroll()); }
});

const SongCardListContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCardList);

export default SongCardListContainer;
