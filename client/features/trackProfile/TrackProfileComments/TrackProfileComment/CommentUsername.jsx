import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';

const StyledUsername = styled.span`
  color: ${props => props.theme.fontColorSub};
  font-size: 0.85rem;
  font-weight: 700;
`;

export default function CommentUsername({ linkTo, children }) {
  return (
    <RouterLink to={linkTo}>
      <StyledUsername>
        {children}
      </StyledUsername>
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
