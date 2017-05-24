import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  
`;

function TrackDescription({ children }) {
  return <StyledParagraph>{ children }</StyledParagraph>;
}

TrackDescription.propTypes = {
  children: PropTypes.string,
};

TrackDescription.defaultProps = {
  children: '',
};

export default TrackDescription;
