import { connect } from 'react-redux';
import SongCardList from '../components/SongCardList';
import { getVisibleFetchState, getVisibleSongsAsArray } from '../../../modules/reducers';
import { sagaLoadMoreSongsOnScroll } from '../../../modules/playlists/actions';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: getVisibleFetchState(state),
  songs: getVisibleSongsAsArray(state) // may break on search
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() { dispatch(sagaLoadMoreSongsOnScroll()); }
});

const SongCardListContainer = connect(mapStateToProps,
  mapDispatchToProps)(SongCardList);

export default SongCardListContainer;
