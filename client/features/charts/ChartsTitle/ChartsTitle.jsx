import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { getCurrentGenreTitle } from 'client/features/charts/chartsSelectors';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

function ChartsTitle({ genreTitle }) {
  return <Title>Top 50 - {genreTitle}</Title>;
}

ChartsTitle.propTypes = {
  genreTitle: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    genreTitle: `${getCurrentGenreTitle(state)}`,
  };
}

export default connect(mapStateToProps)(ChartsTitle);
