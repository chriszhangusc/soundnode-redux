import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledUsername = styled.h2`

  font-size: 1.5rem;
`;

function TrackUsername({ children }) {
  return <StyledUsername>{ children }</StyledUsername>;
}

TrackUsername.propTypes = {
  children: PropTypes.string,
};

export default TrackUsername;
