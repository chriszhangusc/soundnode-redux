import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Subtitle = styled.h3`
  font-size: 1rem;
  color: #a9aaae;
`;

export default function ChartsSubtitle({ text }) {
  return <Subtitle>{text}</Subtitle>;
}

ChartsSubtitle.defaultProps = {
  text: '',
};

ChartsSubtitle.propTypes = {
  text: PropTypes.string,
};
