import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SongCardList from '@soundnode-redux/client/src/common/components/SongCardList';
import { compose } from 'recompose';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import {
  isFavoritesFetching,
  getFavoritesIds,
  getFavoritesPlaylist,
} from '@soundnode-redux/client/src/features/favorites/favoritesSelectors';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import * as favActions from '@soundnode-redux/client/src/features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.loadFavorites();
  }

  // componentWillUnmount() {
  //   this.props.resetFavoritesState();
  // }

  render() {
    return (
      <div>
        <PageTitle>Favorites</PageTitle>
        <SongCardList
          playlist={this.props.playlist}
          fetching={this.props.fetching}
          trackIds={this.props.playlist.trackIds}
          scrollFunc={this.props.loadMoreFavorites}
        />
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
    trackIds: getFavoritesIds(state),
    playlist: getFavoritesPlaylist(state),
  };
}

export default compose(connect(mapStateToProps, favActions), withScrollToTopOnEnter)(Favorites);
