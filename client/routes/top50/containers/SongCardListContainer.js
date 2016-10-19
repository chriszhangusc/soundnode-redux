import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isChartsFetching, getChartsTrackMap } from 'client/redux/modules/reducers';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  tracks: getChartsTrackMap(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
