import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';

const StyledUsername = styled.span`
  margin: 10px 0;
  font-size: 1.5rem;
`;

function TrackUsername({ children, to }) {
  return (
    <StyledUsername>
      <RouterLink to={to}>
        {children}
      </RouterLink>
    </StyledUsername>
  );
}

TrackUsername.defaultProps = {
  children: null,
  to: '',
};

TrackUsername.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};

export default TrackUsername;
