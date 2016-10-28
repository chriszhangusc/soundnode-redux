import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isChartsFetching, getChartsTrackIds, loadMoreCharts } from 'client/redux/modules/charts';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  trackIds: getChartsTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    dispatch(loadMoreCharts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
