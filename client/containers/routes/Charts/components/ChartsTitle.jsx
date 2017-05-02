import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default ChartsTitle;
