import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  margin: 0;
`;

function TrackTitle({ children }) {
  return <StyledTitle>{ children }</StyledTitle>;
}

TrackTitle.propTypes = {
  children: PropTypes.string,
};

export default TrackTitle;
