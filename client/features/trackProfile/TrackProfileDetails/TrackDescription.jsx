import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const StyledParagraph = styled.p`
  max-height: 190px;
  overflow: hidden;
  white-space: pre-wrap;
  font-size: 0.9rem;
  color: ${FONT_COLOR_SECONDARY}
`;

function TrackDescription({ children }) {
  return <StyledParagraph>{children}</StyledParagraph>;
}

TrackDescription.propTypes = {
  children: PropTypes.string,
};

TrackDescription.defaultProps = {
  children: '',
};

export default TrackDescription;
