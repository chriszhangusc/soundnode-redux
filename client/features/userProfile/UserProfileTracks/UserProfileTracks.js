import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { loadMoreTracks } from 'features/userProfile/userProfileActions';
import { isUserTracksFetching, getProfiledUserTrackIds } from 'features/userProfile/userProfileSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
function mapStateToProps(state) {
  return {
    fetching: isUserTracksFetching(state),
    trackIds: getProfiledUserTrackIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      dispatch(loadMoreTracks());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
