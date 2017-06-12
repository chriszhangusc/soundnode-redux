import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { isAuthenticated } from 'client/features/auth/authUtils';
import { notificationWarning } from 'client/features/notification/notificationActions';
import FavoritesList from './FavoritesList';
import { getFavoritesIds } from '../favoritesSelectors';
import * as favoritesActionCreators from '../favoritesActions';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

class Favorites extends React.Component {
  componentWillMount() {
    const { showSigninRequired } = this.props;
    if (!isAuthenticated()) {
      showSigninRequired();
    } else {
      const { actions } = this.props;
      actions.loadFavorites();
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearFavoritesState();
  }

  render() {
    const authed = isAuthenticated();
    return !authed
      ? <Redirect to="/" />
      : <div>
        <Title>Favorites</Title>
        <FavoritesList />
      </div>;
  }
}

Favorites.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  showSigninRequired: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    favorites: getFavoritesIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(favoritesActionCreators, dispatch),
    showSigninRequired() {
      dispatch(notificationWarning('Please signin with SoundCloud first'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
