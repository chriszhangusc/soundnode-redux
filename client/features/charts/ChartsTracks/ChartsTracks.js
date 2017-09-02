import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isChartsFetching } from 'features/charts/chartsSelectors';

import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';

import { loadMoreCharts } from 'features/charts/chartsActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isChartsFetching(state),
    trackIds: getVisiblePlayQueue(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      dispatch(loadMoreCharts());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
