import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import { isFavoritesFetching } from 'client/features/favorites/favoritesSelectors';
import { getVisiblePlaylist } from 'client/features/playlist/playlistSelectors';
import { loadMoreFavorites } from 'client/features/favorites/favoritesActions';

function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getVisiblePlaylist(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    scrollFunc() {
      dispatch(loadMoreFavorites());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
