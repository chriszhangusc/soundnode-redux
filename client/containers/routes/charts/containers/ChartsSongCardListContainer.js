import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import {
  isChartsFetching,
  getChartsTrackIds,
  getChartsGenre,
} from 'client/redux/modules/charts/selectors';

import { loadMoreCharts } from 'client/redux/modules/charts/actions';

// Container for SongCardList
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  trackIds: getChartsTrackIds(state),
  playlistName: getChartsGenre(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    dispatch(loadMoreCharts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
