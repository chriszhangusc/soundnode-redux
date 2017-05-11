import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import { loadMoreUserTracks } from 'client/features/userProfile/userProfileActions';
import { isUserTracksFetching, getProfiledUserTrackIds } from 'client/features/userProfile/userProfileSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isUserTracksFetching(state),
  trackIds: getProfiledUserTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  // Load more tracks
  scrollFunc() {
    console.log('Fetch more user tracks');
    dispatch(loadMoreUserTracks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
