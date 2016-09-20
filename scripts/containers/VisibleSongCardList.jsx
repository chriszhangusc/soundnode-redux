import { connect } from 'react-redux';
import { loadMoreSongsOnScroll } from '../actions';
import SongCardList from '../components/SongCardList';
import * as selectors from '../selectors/songCardsSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = (state) => ({
  isFetching: selectors.getFetchState(state),
  songs: selectors.getVisibleSongsAsArray(state) // may break on search
})

const mapDispatchToProps = (dispatch) => ({
  scrollFunc() { dispatch(loadMoreSongsOnScroll()); }
})

const VisibleSongCardList = connect(mapStateToProps,
  mapDispatchToProps)(SongCardList);

export default VisibleSongCardList;
