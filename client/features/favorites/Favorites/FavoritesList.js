import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching } from 'features/favorites/favoritesSelectors';
import { getVisiblePlaylist } from 'features/playlist/playlistSelectors';
import { loadMoreFavorites } from 'features/favorites/favoritesActions';

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
