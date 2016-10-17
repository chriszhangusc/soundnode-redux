import { connect } from 'react-redux';
// Reusing SongCardList Dumb Component!!
import SongCardList from 'client/components/SongCardList';
import { getIsChartsFetching, getChartsTrackMap } from 'client/redux/modules/reducers';
// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: getIsChartsFetching(state),
  tracks: getChartsTrackMap(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('Scroll Func lol');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
