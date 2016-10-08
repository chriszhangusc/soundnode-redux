import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/components/SongCardList';
import { getIsChartsFetching, getChartsAsArray } from 'client/modules/reducers';
import { sagaLoadMoreSongsOnScroll } from 'client/modules/playlists/actions';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: getIsChartsFetching(state),
  songs: getChartsAsArray(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() { dispatch(sagaLoadMoreSongsOnScroll()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
