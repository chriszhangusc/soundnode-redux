import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/components/SongCardList';
import { getVisibleFetchState, getVisibleSongsAsArray } from 'client/modules/reducers';
import { sagaLoadMoreSongsOnScroll } from 'client/modules/playlists/actions';
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
