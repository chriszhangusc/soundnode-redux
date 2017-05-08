import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/common/components/SongCardList';
import { isSearching, getSearchResultTrackIds } from 'client/features/search';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isSearching(state),
  // Array of TrackRecords
  trackIds: getSearchResultTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {},
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
