import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import {
  isChartsFetching,
  getChartsSelectedGenre,
} from 'client/features/charts/chartsSelectors';

import { getVisiblePlaylist } from 'client/features/playlist/playlistSelectors';

import { loadMoreCharts } from 'client/features/charts/chartsActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isChartsFetching(state),
    trackIds: getVisiblePlaylist(state),
    playlistName: getChartsSelectedGenre(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      console.log('More charts');
      dispatch(loadMoreCharts());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
