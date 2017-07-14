import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { loadMoreUserTracks } from 'features/userProfile/userProfileActions';
import { isUserTracksFetching } from 'features/userProfile/userProfileSelectors';
import { getVisiblePlaylist } from 'features/playlist/playlistSelectors';

// Container for SongCardList
// Simply providing slices of state for the component to render.
function mapStateToProps(state) {
  return {
    fetching: isUserTracksFetching(state),
    trackIds: getVisiblePlaylist(state),
    title: 'Tracks',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      console.log('Fetch more user tracks');
      dispatch(loadMoreUserTracks());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
