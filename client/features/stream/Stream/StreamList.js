import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { getVisiblePlaylist } from 'features/playlist/playlistSelectors';
import { isStreamFetching } from 'features/stream/streamSelectors';
import { loadMoreStream } from 'features/stream/streamActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    trackIds: getVisiblePlaylist(state),
    // playlistName: getChartsSelectedGenre(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      console.log('Load more stream');
      dispatch(loadMoreStream());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
