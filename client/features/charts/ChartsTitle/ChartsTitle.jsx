import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { getCurrentGenreTitle } from 'client/features/charts/chartsSelectors';
import { CHARTS_MAIN_TITLE_PREFIX } from 'client/features/charts/chartsConsts';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

function ChartsTitle({ genreTitle }) {
  return <Title>{genreTitle}</Title>;
}

ChartsTitle.propTypes = {
  genreTitle: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    genreTitle: `${CHARTS_MAIN_TITLE_PREFIX}${getCurrentGenreTitle(state)}`,
  };
}

export default connect(mapStateToProps)(ChartsTitle);
