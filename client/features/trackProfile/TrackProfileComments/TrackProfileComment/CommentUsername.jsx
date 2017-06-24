import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FONT_COLOR_SECONDARY } from 'app/css/colors';

const StyledUsername = styled.span`
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.85rem;
  font-weight: 700;
`;

export default function CommentUsername({ linkTo, children }) {
  return (
    <Link to={linkTo}>
      <StyledUsername>{children}</StyledUsername>
    </Link>
  );
}

CommentUsername.defaultProps = {
  linkTo: '',
  children: '',
};

CommentUsername.propTypes = {
  linkTo: PropTypes.string,
  children: PropTypes.string,
};
