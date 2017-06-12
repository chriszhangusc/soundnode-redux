import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import { isStreamFetching, getStreamIds } from 'client/features/stream/streamSelectors';
import { loadMoreStream } from 'client/features/stream/streamActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    trackIds: getStreamIds(state),
    // playlistName: getChartsSelectedGenre(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      // dispatch(loadMoreFavorites());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
