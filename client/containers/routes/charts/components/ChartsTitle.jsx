import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.h1`
  margin: 30px 20px;
  font-weight: 400;
  font-size: 2rem;
`;

export default function ChartsTitle({ text }) {
  return <Title>{text}</Title>;
}

ChartsTitle.defaultProps = {
  text: '',
};

ChartsTitle.propTypes = {
  text: PropTypes.string,
};
