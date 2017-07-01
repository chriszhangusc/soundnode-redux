import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';
import { FONT_COLOR_SECONDARY } from 'app/css/colors';

const StyledUsername = styled.span`
  color: ${FONT_COLOR_SECONDARY};
  font-size: 0.85rem;
  font-weight: 700;
`;

export default function CommentUsername({ linkTo, children }) {
  return (
    <RouterLink to={linkTo}>
      <StyledUsername>{children}</StyledUsername>
    </RouterLink>
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
