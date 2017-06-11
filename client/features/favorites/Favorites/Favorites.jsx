import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
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
    const { actions } = this.props;
    actions.loadFavorites();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Title>Favorites</Title>
        <FavoritesList />
      </div>
    );
  }
}

Favorites.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    favorites: getFavoritesIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(favoritesActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
