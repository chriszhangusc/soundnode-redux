import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching, getFavoriteTrackIds } from 'features/favorites/favoritesSelectors';
import PageTitle from 'common/components/PageTitle';
import * as favActions from 'features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.loadFavorites();
  }

  componentWillUnmount() {
    this.props.resetFavoritesState();
  }

  render() {
    return (
      <div>
        <PageTitle>Favorites</PageTitle>
        <SongCardList title="Favorites" {...this.props} scrollFunc={this.props.loadMoreFavorites} />
      </div>
    );
  }
}

Favorites.propTypes = {
  loadFavorites: PropTypes.func.isRequired,
  loadMoreFavorites: PropTypes.func.isRequired,
  resetFavoritesState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getFavoriteTrackIds(state),
  };
}

export default connect(mapStateToProps, favActions)(Favorites);
