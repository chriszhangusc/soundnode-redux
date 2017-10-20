import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import {
  isChartsFetching,
  getCurrentChartsPlaylist,
  getCurrentChartsTrackIds,
} from 'features/charts/chartsSelectors';
import { loadMoreCharts } from 'features/charts/chartsActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isChartsFetching(state),
    playlist: getCurrentChartsPlaylist(state),
    trackIds: getCurrentChartsTrackIds(state),
  };
}

function mapDispatchToProps(dispatch, { selectedGenre, name }) {
  return {
    scrollFunc() {
      dispatch(loadMoreCharts(selectedGenre, name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
