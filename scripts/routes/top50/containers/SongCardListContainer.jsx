import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/components/SongCardList';
import { getIsChartsFetching, getChartsTrackMap } from 'client/modules/reducers';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: getIsChartsFetching(state),
  // Array of TrackRecords
  tracks: getChartsTrackMap(state).toArray()
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {}
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
