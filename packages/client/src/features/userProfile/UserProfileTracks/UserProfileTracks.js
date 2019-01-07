import { connect } from 'react-redux';
import SongCardList from '@soundnode-redux/client/src/common/components/SongCardList';
import { loadMoreTracks } from '@soundnode-redux/client/src/features/userProfile/userProfileActions';
import {
  isUserTracksFetching,
  getProfiledUserTrackIds,
  getProfiledUserPlaylist,
} from '@soundnode-redux/client/src/features/userProfile/userProfileSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
function mapStateToProps(state) {
  return {
    fetching: isUserTracksFetching(state),
    playlist: getProfiledUserPlaylist(state),
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
