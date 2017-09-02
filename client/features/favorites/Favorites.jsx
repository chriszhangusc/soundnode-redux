import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlaylistName } from 'features/playQueue/playlistActions';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching } from 'features/favorites/favoritesSelectors';
import { getVisiblePlaylist } from 'features/playQueue/playlistSelectors';
import { Box } from 'grid-styled';
import PageTitle from 'common/components/PageTitle';
import * as favActions from 'features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.updateVisiblePlaylistName('favorites');
    this.props.loadFavorites();
  }

  componentWillUnmount() {
    this.props.resetFavoritesState();
  }

  render() {
    return (
      <Box>
        <PageTitle>Favorites</PageTitle>
        <SongCardList title="Favorites" {...this.props} scrollFunc={this.props.loadMoreFavorites} />
      </Box>
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
