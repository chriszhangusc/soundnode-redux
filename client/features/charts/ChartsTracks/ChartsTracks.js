import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isChartsFetching, getCurrentCharts } from 'features/charts/chartsSelectors';
import { loadMoreCharts } from 'features/charts/chartsActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isChartsFetching(state),
    trackIds: getCurrentCharts(state),
  };
}

function mapDispatchToProps(dispatch, { selectedGenre }) {
  return {
    scrollFunc() {
      dispatch(loadMoreCharts(selectedGenre));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
