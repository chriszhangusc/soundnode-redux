import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching } from 'features/favorites/favoritesSelectors';
import { getVisiblePlaylist } from 'features/playlist/playlistSelectors';
import * as favActions from 'features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentWillMount() {
    this.props.updateVisiblePlaylistName('favorites');
    this.props.loadFavorites();
  }

  componentWillUnmount() {
    this.props.resetFavoritesState();
  }

  render() {
    return (
      <SongCardList title="Favorites" {...this.props} scrollFunc={this.props.loadMoreFavorites} />
    );
  }
}

Favorites.propTypes = {
  updateVisiblePlaylistName: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  loadMoreFavorites: PropTypes.func.isRequired,
  resetFavoritesState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getVisiblePlaylist(state),
  };
}

const actions = {
  ...favActions,
  updateVisiblePlaylistName,
};

export default connect(mapStateToProps, actions)(Favorites);
