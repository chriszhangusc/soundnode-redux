import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  max-height: 190px;
  overflow: scroll;
  white-space: pre-wrap;
  font-size: 0.9rem;
  color: ${props => props.theme.fontColorSub};
`;

function TrackDescription({ children }) {
  return (
    <StyledParagraph>
      {children}
    </StyledParagraph>
  );
}

TrackDescription.propTypes = {
  children: PropTypes.string,
};

TrackDescription.defaultProps = {
  children: '',
};

export default TrackDescription;
