import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import {
  isChartsFetching,
  getChartsTrackIds,
  getChartsSelectedGenre,
} from 'client/redux/modules/charts/chartsSelectors';

import { loadMoreCharts } from 'client/redux/modules/charts/chartsActions';

// Container for SongCardList
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  trackIds: getChartsTrackIds(state),
  playlistName: getChartsSelectedGenre(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    dispatch(loadMoreCharts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
