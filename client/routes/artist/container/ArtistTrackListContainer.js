import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isTracksFetching, getTrackIds } from 'client/redux/modules/artist';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isTracksFetching(state),
  trackIds: getTrackIds(state)
});

const mapDispatchToProps = (dispatch) => ({
  scrollFunc() { console.log('Scroll'); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
