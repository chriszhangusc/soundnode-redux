import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { loadMoreUserTracks } from 'client/redux/modules/user/actions';
import { isUserTracksFetching, getUserTrackIds } from 'client/redux/modules/user/selectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isUserTracksFetching(state),
  trackIds: getUserTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  // Load more tracks
  scrollFunc() {
    console.log('Fetch more user tracks');
    dispatch(loadMoreUserTracks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
