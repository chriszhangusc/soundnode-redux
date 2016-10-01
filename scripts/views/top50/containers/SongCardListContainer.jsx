import { connect } from 'react-redux';
import SongCardList from '../components/SongCardList';
import { getVisibleFetchState } from '../../../modules/reducers';
import { getVisibleSongsAsArray } from '../../../selectors/songCardListSelectors';
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
