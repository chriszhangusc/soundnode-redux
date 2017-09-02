import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isChartsFetching } from 'features/charts/chartsSelectors';

import { getVisiblePlaylist } from 'features/playQueue/playlistSelectors';

import { loadMoreCharts } from 'features/charts/chartsActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isChartsFetching(state),
    trackIds: getVisiblePlaylist(state),
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
