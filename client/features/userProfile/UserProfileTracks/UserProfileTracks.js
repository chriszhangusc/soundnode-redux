import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { loadMoreTracks } from 'features/userProfile/userProfileActions';
import { isUserTracksFetching } from 'features/userProfile/userProfileSelectors';
import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
function mapStateToProps(state) {
  return {
    fetching: isUserTracksFetching(state),
    trackIds: getVisiblePlayQueue(state),
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
