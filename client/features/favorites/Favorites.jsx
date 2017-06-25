import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notificationWarning } from 'features/notification/notificationActions';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import SongCardList from 'common/components/SongCardList';
import { isFavoritesFetching } from 'features/favorites/favoritesSelectors';
import { getVisiblePlaylist } from 'features/playlist/playlistSelectors';
import * as favActions from 'features/favorites/favoritesActions';

class Favorites extends React.Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.updateVisiblePlaylistName('favorites');
    actions.loadFavorites();
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetFavoritesState();
  }

  render() {
    return <SongCardList title="Favorites" {...this.props} />;
  }
}

Favorites.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isFavoritesFetching(state),
    trackIds: getVisiblePlaylist(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...favActions,
        updateVisiblePlaylistName,
      },
      dispatch,
    ),

    scrollFunc() {
      dispatch(favActions.loadMoreFavorites());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
