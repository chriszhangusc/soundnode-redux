import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const StyledTitle = styled.div`
    text-align: center;
    font-size: 0.9rem;
    color: ${FONT_COLOR_SECONDARY};
    margin-bottom: 10px;
`;

function DropdownSearchResultTitle({ children }) {
  return (
    <StyledTitle>{children}</StyledTitle>
  );
}

DropdownSearchResultTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DropdownSearchResultTitle;
