import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import { isFavoritesFetching, getFavoritesIds } from 'client/features/favorites/favoritesSelectors';
import { loadMoreFavorites } from 'client/features/favorites/favoritesActions';

// Container for SongCardList
function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getFavoritesIds(state),
    // playlistName: getChartsSelectedGenre(state),
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
