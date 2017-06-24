import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { loadMoreUserTracks } from 'features/userProfile/userProfileActions';
import {
  isUserTracksFetching,
  getProfiledUserTrackIds,
} from 'features/userProfile/userProfileSelectors';

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
