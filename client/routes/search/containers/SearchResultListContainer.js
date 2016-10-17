import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/components/SongCardList';
import { isSearching, getSearchResults } from 'client/redux/modules/reducers';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: isSearching(state),
  // Array of TrackRecords
  trackMap: getSearchResults(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {}
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
