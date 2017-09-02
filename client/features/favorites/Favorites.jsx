import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlayQueueName } from 'features/playQueue/playQueueActions';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching } from 'features/favorites/favoritesSelectors';
import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';
import { Box } from 'grid-styled';
import PageTitle from 'common/components/PageTitle';
import * as favActions from 'features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.updateVisiblePlayQueueName('favorites');
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
  updateVisiblePlayQueueName: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  loadMoreFavorites: PropTypes.func.isRequired,
  resetFavoritesState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getVisiblePlayQueue(state),
  };
}

const actions = {
  ...favActions,
  updateVisiblePlayQueueName,
};

export default connect(mapStateToProps, actions)(Favorites);
